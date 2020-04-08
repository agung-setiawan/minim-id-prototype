const express = require("express");
const cors = require("cors");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const ip = require("ip");
const fs = require("fs");
const request = require("request");
const cloudinary = require("cloudinary").v2;
const auth = require("../../middleware/auth");

// Model
const Shortener = require("../../models/Shortener");
const ShortenerClicks = require("../../models/ShortenerClicks");
const User = require("../../models/User");

router.use(cors());

// @route    POST api/shortener
// @desc     Create new shortener link
// @access   Public
router.post(
  "/getShorten",
  [
    check("theUrl", "URL is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let result = "";
      for (let i = 5; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
      }

      const newLink = req.body.hostname + "/" + result;
      res.status(200).json({ newLink: newLink, newCode: result });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST api/saveNewShorten
// @desc     POST Save new shortener data
// @access   Public
router.post(
  "/saveNewShorten",
  [
    check("theLink", "URL is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Example #1 (screenshotlayer.com) : http://api.screenshotlayer.com/api/capture?access_key=03fd3de963d663ec9d1c626f4c0b7d4b&url=https://www.detik.com&viewport=1440x900&width=1024
      // Example #2 (screenshotmechine.com) : https://api.screenshotmachine.com/?key=d0ce7d&url=detik.com&dimension=1024x768&device=desktop&format=jpg&cacheLimit=0&delay=200&zoom=100
      // Next Taxk Extract Domain Name from URL

      if (req.body.typeIn === "PUBLIC") {
        /* -- Slug Function */
        let str = req.body.title;

        str = str.replace(/^\s+|\s+$/g, ""); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to = "aaaaeeeeiiiioooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
          str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
        }

        str = str
          .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
          .replace(/\s+/g, "-") // collapse whitespace and replace by -
          .replace(/-+/g, "-"); // collapse dashes
        /* -- END Slug Function */

        // -- OLD FUNCTION --> let slugs = req.body.title.replace(/\s+/g, "-").toLowerCase();
        let slugs = str;
        let imgScreenShoot = "";
        let clietUrl =
          "https://api.screenshotmachine.com/?key=d0ce7d&url=" +
          req.body.theUrl +
          "&dimension=1024x768&device=desktop&format=jpg&cacheLimit=0&delay=200&zoom=100";

        cloudinary.config({
          cloud_name: config.get("cloud_name"),
          api_key: config.get("api_key"),
          api_secret: config.get("api_secret")
        });

        cloudinary.uploader.upload(
          clietUrl,
          {
            resource_type: "image",
            public_id: "MinimID/" + slugs,
            overwrite: true,
            secure: false
          },
          async function(error, result) {
            if (result.url.length > 0 || result.url != "") {
              imgScreenShoot = result.url;
            } else {
              imgScreenShoot = null;
            }

            const newShorten = new Shortener({
              user: req.body.user_id,
              channelID: req.body.channelID,
              url: req.body.theUrl,
              shorten: req.body.theLink,
              title: req.body.title,
              slug: slugs,
              summary: req.body.summary,
              image: imgScreenShoot,
              showType: req.body.typeIn,
              showCount: 0,
              shortenCode: req.body.shortenCode,
              ipAddress: ip.address(),
              isApproved: "YES",
              mth: req.body.mth,
              yrs: req.body.yrs
            });

            await newShorten.save();
          }
        );
      } else {
        const newShorten = new Shortener({
          user: "",
          channelID: 0,
          url: req.body.theUrl,
          shorten: req.body.theLink,
          showType: req.body.typeIn,
          showCount: 0,
          shortenCode: req.body.shortenCode,
          ipAddress: ip.address(),
          isApproved: "YES",
          mth: req.body.mth,
          yrs: req.body.yrs
        });

        await newShorten.save();
      }
      res.status(200).json({ success: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

/*
| @route    POST api/getPublicShorten
| @desc     GET public shorten list
| @access   Public
*/
router.get("/getPublicShorten", async (req, res) => {
  try {
    const shorten = await Shortener.find(
      { showType: "PUBLIC", isApproved: "YES" },
      { shorten: 1, title: 1, summary: 1, image: 1, user: 1, date: 1 }
    ).sort({ date: -1 });

    if (shorten) {
      res.status(200).json(shorten);
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/*
| @route    POST api/getShortenChannelLink
| @desc     GET Specific shorten URL by channel name
| @access   Public
*/
router.post("/getShortenChannelLink", async (req, res) => {
  try {
    const theURL =
      req.body.hostName + "/" + req.body.channel + "/" + req.body.slug;
    const theData = await Shortener.find(
      { shorten: theURL },
      { url: 1, clicked: 1 }
    );

    const newClick = new ShortenerClicks({
      shortenerId: theData._id,
      clicked: 1,
      ipAddress: ip.address()
    });

    await newClick.save();

    res.json({ theData });
  } catch (err) {
    console.error("\n " + err.message);
    res.status(500).send("Server Error");
  }
});

/*
| @route    POST api/getShortenLink
| @desc     GET Specific shorten URL by code
| @access   Public
*/
router.post("/getShortenLink", async (req, res) => {
  try {
    const theData = await Shortener.find(
      { shortenCode: req.body.queryCode },
      { url: 1, clicked: 1 }
    );

    const newClick = new ShortenerClicks({
      shortenerId: theData._id,
      clicked: 1,
      ipAddress: ip.address()
    });

    await newClick.save();

    res.json({ theData });
  } catch (err) {
    console.error("\n " + err.message);
    res.status(500).send({ msg: err.message });
  }
});

/*
| @route    : POST api/shortener/me
| @desc     : GET user shortener after login
| @access   : private
*/
router.get("/me/:type", auth, async (req, res) => {
  try {
    const shorten = await Shortener.find(
      { user: req.user.id, showType: req.params.type.toUpperCase() },
      { shorten: 1, title: 1, summary: 1, image: 1, user: 1, date: 1 }
    ).sort({ date: -1 });

    res.json(shorten);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/*
| @route    : POST api/shortener/me
| @desc     : GET user shortener after login
| @access   : private
*/
router.get("/getAllStats/:showType", auth, async (req, res) => {
  try {
    const date = new Date();
    let publicData = [];
    let privateData = [];
    let dataResult = [];
    let years = date.getFullYear();

    for (let i = 1; i <= 12; i++) {
      const result = await Shortener.findOne({
        user: req.user.id,
        showType: "PUBLIC",
        mth: i,
        yrs: years
      }).countDocuments();

      if (result) {
        publicData.push(result);
      } else {
        publicData.push(0);
      }
    }

    for (let i = 1; i <= 12; i++) {
      const result = await Shortener.findOne({
        user: req.user.id,
        showType: "PRIVATE",
        mth: i,
        yrs: years
      }).countDocuments();

      if (result) {
        privateData.push(result);
      } else {
        privateData.push(0);
      }
    }

    dataResult[0] = { name: "public", data: publicData };
    dataResult[1] = { name: "private", data: privateData };

    res.status(200).send(dataResult);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/*
| @route    : POST api/shortener/me
| @desc     : GET user shortener after login
| @access   : private
*/
router.get("/get/counter/:showType", async (req, res) => {
  try {
    if (req.params.showType === "total") {
      const shorten = await Shortener.find({
        isApproved: "YES"
      }).countDocuments();
      res.status(200).json(shorten);
    } else {
      const shorten = await Shortener.find({
        showType: req.params.showType,
        isApproved: "YES"
      }).countDocuments();
		res.status(200).json(shorten);
	}
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
