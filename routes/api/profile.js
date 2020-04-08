const express = require("express");
const request = require("request");
const cors = require("cors");
const config = require("config");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const path = require("path");
const auth = require("../../middleware/auth");
const cloudinary = require("cloudinary").v2;
// const sgEmail = require("sendgrid").mail;
const { check, validationResult } = require("express-validator/check");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Multer Intial Value
const storage = multer.diskStorage({
  destination: "client/src/img/upload",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.use(cors());

/*
| @route    GET api/profile/me
| @desc     Get current users profile
| @access   Private
*/
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

/* 
| -- UPDATE OR CREATE PROFILE
| @route    POST api/profile
| @desc     Create or update user profile
| @access   Private
*/
router.post(
  "/",
  [
    auth,
    [
      check("name", "Nama tidak boleh kosong")
        .not()
        .isEmpty(),
      check("email", "Email tidak boleh kosong")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, gender, selfDescription } = req.body;

    // Build profile object
    const userFields = {};
    userFields.user = req.user.id;
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    if (gender) userFields.gender = gender;
    if (selfDescription) userFields.selfDescription = selfDescription;

    try {
      let userProfile = await User.findOne({ _id: req.user.id });

      if (userProfile) {
        // Update Condition
        userData = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: userFields },
          { new: true }
        );

        return res.status(200).json(userData);
      } else {
        return res.status(400).send("Failed, please try again");
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/*
| @route    POST api/profile/change/avatar
| @desc     Update user profile
| @access   Private
*/
router.post(
  "/change/avatar",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    const file = req.file;
    const userFields = {};

    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    cloudinary.config({
      cloud_name: config.get("cloud_name"),
      api_key: config.get("api_key"),
      api_secret: config.get("api_secret")
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `avatar/${uniqueFilename}`, tags: `avatar` },
      async function(err, image) {
        if (err) return res.send(err);
        userFields.avatar = image.url;
        users = await User.findByIdAndUpdate(
          req.user.id,
          { $set: userFields },
          { new: true }
        );
        res.send(userFields);
      }
    );
  }
);

/*
| @route    POST api/profile/update/password
| @desc     Update user password
| @access   Private
*/
router.post(
  "/update/password",
  [
    auth,
    [
      check(
        "currentPassword",
        "Kata sandi Kamu yang sekarang tidak boleh kosong"
      )
        .not()
        .isEmpty(),
      check("newPassword", "Masukkan kata sandi baru dengan minimal 6 karakter")
        .not()
        .isEmpty()
        .isLength({ min: 6 }),
      check(
        "retypePassword",
        "Masukkan kata sandi baru dengan minimal 6 karakter"
      )
        .not()
        .isEmpty()
        .isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword, retypePassword } = req.body;

    if (currentPassword.lenght === 0) {
      return res.status(401).send({
        success: false,
        msg: "Kata sandi aktif tidak boleh kosong"
      });
    }

    if (newPassword !== retypePassword) {
      return res.status(401).send({
        success: false,
        msg: "Kata sandi baru tidak cocok"
      });
    }

    const user = await User.findOne({ _id: req.user.id });

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        msg: "Kata sandi Kamu saat ini salah"
      });
    }

    // Build profile object
    const userFields = {};
    userFields.user = req.user.id;
    userFields.regFrom = "native";

    try {
      const salt = await bcrypt.genSalt(10);
      let user = await User.findOne({ _id: req.user.id });

      userFields.password = await bcrypt.hash(retypePassword, salt);

      if (user) {
        user = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: userFields },
          { new: false }
        );
        return res.status(200).json(user);
      } else {
        res
          .status(401)
          .send({ success: false, msg: "This User Does Not Exist" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
