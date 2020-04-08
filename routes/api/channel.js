const express = require("express");
const cors = require("cors");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

// Model
const Channel = require("../../models/Channel");
const Shortener = require("../../models/Shortener");

router.use(cors());

/* 
| @route    POST api/channel
| @desc     Create new channel
| @access   Private
*/
router.post(
  "/",
  auth,
  [
    check("name", "Name channel tidak boleh kosong")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send({ errors: errors.array() });
    }

    try {
      const newChannel = new Channel({
        user: req.user.id,
        name: req.body.name,
        slug: req.body.name.replace(/\s+/g, "-").toLowerCase(),
        description: req.body.description,
        isActive: "YES"
      });

      const channel = await newChannel.save();

      res.status(200).json(channel);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

/* 
| @route    GET api/channel
| @desc     GET all channel in list
| @access   Private
*/
router.get("/", auth, async (req, res) => {
  try {
    const channels = Channel.find({ user: req.user.id }, function(
      err,
      documents
    ) {
      res.send(documents);
    }).sort({
      date: -1
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, msg: err.message });
  }
});

/* 
| @route    GET api/channel/count
| @desc     Counting share channel
| @access   Private
*/
router.get("/count/:id", async (req, res) => {
  try {
    const shares = await Shortener.find({
      channelID: req.params.id
    }).countDocuments();

    res.status(200).json(shares);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, msg: err.message });
  }
});

module.exports = router;
