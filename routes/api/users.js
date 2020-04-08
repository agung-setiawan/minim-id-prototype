const express = require("express");
const cors = require("cors");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const ip = require("ip");

const User = require("../../models/User");

router.use(cors());

/*
| -- USER REGISTRATION
| @route    POST api/users
| @desc     Register user
| @access   Public
*/
router.post(
  "/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let code = Math.random()
      .toString(20)
      .substring(7);

    let apiKeyTemp = Math.random()
      .toString(20)
      .substring(3);

    const refCode = code;
    const apiKey = apiKeyTemp;
    const selfDescription = "About Me";
    const gender = "L";
    const avatar = `http://www.gravatar.com/avatar/${code}?s=200&r=pg&d=mm`;
    const { name, email, password, hostname } = req.body;
    const regFrom = "native";

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(200).json({
          msg: "Email sudah terdaftar",
          sts: "failed",
          tokens: ""
        });
      }

      user = new User({
        name,
        email,
        password,
        selfDescription,
        gender,
        avatar,
        refCode,
        regFrom,
        apiKey,
        ipAddress: ip.address()
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Send Emaill -> LATER ON
      /*
      let contentBody =
        "<p>Thanks for the regristration, you almost a step into the final, please click this link or copy this link into browser to activate your account</p>" +
        "<p><a href='" +
        hostname +
        "/activation?" +
        refCode +
        "'>Activate My Account</a></p>";

      sgMail.setApiKey(config.get("sendGridKey"));
      const msg = {
        to: email,
        from: "noreply@minim.id",
        subject: "Your Registration Process",
        text: "Thanks for the regristration",
        html: contentBody
      };
      sgMail.send(msg);
      */

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
          res.status(200).json({
            msg:
              "Terima kasih, pendaftaran Kamu sudah selesai, Kami sudah mengirimkan email kode aktivasi silahkan cek email Kamu untuk proses aktivasi ",
            sts: "passed",
            tokens: token
          });
        }
      );
    } catch (err) {
      res.status(500).send({ errors: [{ msg: err.message }] });
    }
  }
);

// @route    POST api/users/fb/register
// @desc     Register user via Facebook
// @access   Public
router.post(
  "/sosmed/signup",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid emails").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let code = Math.random()
      .toString(20)
      .substring(7);

    const { name, email, picture } = req.body;
    const avatar = picture;
    const password = code;
    const refCode = "";
    const regFrom = "sosmed";

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        avatar,
        password,
        refCode,
        regFrom
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
          res.json({ sts: "passed", uid: password });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user.id
    }).select("-password");

    if (!user) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

router.get("/getUserStats", auth, async (req, res) => {
  try {
    const user = await User.findOne(
      {
        _id: req.user.id
      },
      { logoutDate: 1 }
    );

    if (!user) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    const publicCount = await Shortener.findOne({
      user: req.user.id,
      showType: "PUBLIC"
    }).countDocuments();

    const privateCount = await Shortener.findOne({
      user: req.user.id,
      showType: "PRIVATE"
    }).countDocuments();

    res.status(200).json({
      success: true,
      logoutDate: user.logoutDate,
      totalPublic: publicCount,
      totalPrivate: privateCount
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
