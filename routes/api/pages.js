const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const Pages = require("../../models/Page");

/*
| @route    POST api/pages
| @desc     Get pages content
| @access   Public
*/
router.post("/", async (req, res) => {
  try {
    const pages = await Pages.findOne({ slug: req.body.slug });
    res.json(pages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
