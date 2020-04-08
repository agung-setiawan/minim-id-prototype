const express = require("express");
const cors = require("cors");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const ip = require("ip");
const fs = require("fs");
const request = require("request");
const cloudinary = require("cloudinary").v2;
const validate = require("../../middleware/apikey");
const auth = require("../../middleware/auth");

// Model
const Shortener = require("../../models/Shortener");
const User = require("../../models/User");
const Channel = require("../../models/Channel");

router.use(cors());

/* 
| @route    POST api/shortener
| @desc     Create new shortener link
| @access   Public
*/
router.post(
  "/shortURL",
  [
    check("url", "URL is required")
      .not()
      .isEmpty(),
    check("showType", "Shorten type is required")
      .not()
      .isEmpty()
  ],
  validate,
  async (req, res) => {
    // Collection of validation information
    const errors = validationResult(req);

    // Validation feedback if any value is missing
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Preparing the variable
    let _channelID = 0;
    let _title = "";
    let _summary = "";
    let _slug = "";
    let _imgScreenShoot = "";
    let _shortenCode = "";
    let date = new Date();
    let month = date.getMonth() + 1;
    let years = date.getFullYear();

    try {
      // Create shorten
      const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 5; i > 0; --i) {
        _shortenCode += chars[Math.round(Math.random() * (chars.length - 1))];
      }

      // New shorten link
      const _shorten = config.get("main_domain") + "/" + _shortenCode;

      // PULIC and PRIVATE
      if (req.body.showType.toUpperCase() === "PRIVATE") {
        const newShorten = new Shortener({
          user: req.user._id,
          channelID: 0,
          url: req.body.url,
          shorten: _shorten,
          showType: req.body.showType,
          showCount: 0,
          shortenCode: _shortenCode,
          title: null,
          slug: null,
          summary: null,
          image: null,
          isApproved: "YES",
          ipAddress: ip.address(),
          mth: month,
          yrs: years
        });
        await newShorten.save();
      } else {
        const channel = await Channel.findOne(
          { name: req.body.channel.replace(/\s+/g, "-").toLowerCase() },
          { _id: 1 }
        );

        if (channel) {
          _channelID = channel._id;
          _title = req.body.channelTitle;
          _summary = req.body.channelDescription;
        }

        /* -- Slug Function */
        let str = _title;
        str = str.replace(/^\s+|\s+$/g, ""); // trim
        str = str.toLowerCase();
        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to = "aaaaeeeeiiiioooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
          str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
        }
        _slug = str
          .replace(/[^a-z0-9 -]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
        /* -- END Slug Function */

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
              _imgScreenShoot = result.url;
            } else {
              _imgScreenShoot = null;
            }

            const newShorten = new Shortener({
              user: req.user._id,
              channelID: _channelID,
              url: req.body.url,
              shorten: _shorten,
              title: _title,
              slug: _slug,
              summary: _summary,
              image: _imgScreenShoot,
              showType: req.body.showIn,
              showCount: 0,
              shortenCode: _shortenCode,
              ipAddress: ip.address(),
              isApproved: "YES",
              mth: month,
              yrs: years
            });
            await newShorten.save();
          }
        );
      }
      res.status(200).json({
        status: "success",
        code: 200,
        origin: req.body.url,
        shorten: _shorten,
        created: date.toUTCString()
      });
    } catch (err) {
      // console.error(err.message);
      res.status(500).send({ status: "failed", code: 500, error: err.message });
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
      { showType: "PUBLIC" },
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

router.post("/getipinfo", (req, res) => {
  try {
    iplocation(ip.address(), [], (error, result) => {
      res.json({ result });
    });
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

module.exports = router;
