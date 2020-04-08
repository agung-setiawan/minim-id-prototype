const express = require("express");
const router = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const ip = require("ip");

const User = require("../../models/User");

router.use(cors());

/* 
| -- USER CREDENTIAL --
| @route    GET api/auth
| @desc     Test route
| @access   Public
*/
router.get("/", auth, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findOne({ _id: userID }).select("-password");
    // res.status(200).json(user);
    if (user) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* 
| -- GETTING USER PROFILE --
| @route    GET api/auth
| @desc     Get user profile
| @access   Public
*/
router.get("/profile", auth, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findOne({ _id: userID }).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* 
| -- LOGIN --
| @route    POST api/auth
| @desc     Authenticate user & get token
| @access   Public
*/
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let userEmail = email.toLowerCase().trim();

      let user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.status(401).send({
          success: false,
          msg: "Email atau password Kamu tidak sesuai"
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).send({
          success: false,
          msg: "Email atau password Kamu tidak sesuai"
        });
      }

      if (user.refCode !== "") {
        return res.status(401).send({
          success: false,
          msg: "Akun Kamu belum diaktif kan"
        });
      }

      const payload = {
        user: {
          id: user.id,
          name: user.name
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        async (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/*
| -- LOGOUT --
| @route    : GET api/auth/logout
| @desc     : Terminate login session
| @access   : private
*/
router.get("/logout", auth, async (req, res) => {
  try {
    const userFields = {};
    userFields.logoutDate = new Date();

    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: userFields },
      { new: false }
    );

    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* 
| -- ACCOUNT VERIFY (old) --
| @route    GET api/auth
| @desc     To verify account from login user
| @access   Public
*/

// router.get("/verify/me", async (req, res) => {
//   const { query } = req;
//   const { token } = query;

//   UserSession.find(
//     {
//       _id: token,
//       isDeleted: false
//     },
//     (err, sessions) => {
//       if (err) {
//         console.log(err);
//         return res.status(200).send({
//           success: false,
//           msg: "Error: Server error"
//         });
//       }
//       if (sessions.length != 1) {
//         return res.status(200).send({
//           success: false,
//           msg: "Error: Invalid"
//         });
//       } else {
//         // DO ACTION
//         return res.status(200).send({
//           success: true,
//           message: "Good"
//         });
//       }
//     }
//   );
// });

/*
| -- FORGOT PASSWORD --
| @route    POST api/auth/forgot
| @desc     Forgotten Password
| @access   Public
*/
router.post(
  "/forgot/password",
  [check("email", "Please provide a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, hostname } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      let RandCode = Math.random()
        .toString(20)
        .substring(7);

      //Update Ref Code Into DB
      const userFields = {};
      userFields.refCode = RandCode;
      user = await User.findOneAndUpdate(
        { email: email },
        { $set: userFields },
        { new: false }
      );

      // Send Emaill
      let contentBody =
        "<p>Please click this link or copy this link into browser to recover your password</p>" +
        "<p><a href='" +
        hostname +
        "/reset-password?" +
        RandCode +
        "'>Recover Password</a></p>";

      sgMail.setApiKey(config.get("sendGridKey"));
      const msg = {
        to: email,
        from: "noreply@people-hub.com",
        subject: "Reset Password",
        text: "Reset Password",
        html: contentBody
      };
      sgMail.send(msg);

      res.status(200).json({ codes: RandCode });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

/* 
| -- UPDATE PASSWORD --
| @route    POST api/updatePassword
| @desc     Update User Password
| @access   Public
*/
router.post(
  "/update/password",
  [
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password, refCode } = req.body;

    try {
      let user = await User.findOne({ refCode });

      if (user) {
        const salt = await bcrypt.genSalt(10);

        const userFields = {};
        userFields.refCode = "";
        userFields.password = await bcrypt.hash(password, salt);

        user = await User.findOneAndUpdate(
          { refCode: refCode },
          { $set: userFields },
          { new: false }
        );

        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ sts: "passed", msg: "" });
          }
        );
      } else {
        return res
          .status(404)
          .json({ sts: "invalid", msg: "User is not exists" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/*
| -- REGISTER ACTIVATION --
| @route    POST api/activation
| @desc     To Activate Account
| @access   Public
*/
router.post(
  "/activation",
  [
    check("refCode", "Reference Code is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { refCode } = req.body;

    try {
      let user = await User.findOne({ refCode });

      if (user) {
        const userFields = {};
        userFields.refCode = "";

        user = await User.findOneAndUpdate(
          { refCode: refCode },
          { $set: userFields },
          { new: false }
        );

        res.json({ sts: "passed", msg: "" });
      } else {
        return res
          .status(404)
          .json({ sts: "invalid", msg: "Account is not exists" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
