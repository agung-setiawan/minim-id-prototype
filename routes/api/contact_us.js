const express = require("express");
const cors = require("cors");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const ip = require("ip");
const ContactUS = require("../../models/ContactUS");

router.use(cors());

/*
| @route    POST api/contact_us/save
| @desc     Get pages content
| @access   Public
*/
router.post(
  "/save",
  [
    check("contactName", "Nama tidak boleh kosong")
      .not()
      .isEmpty(),
    check("contactEmail", "Email tidak boleh kosong")
      .not()
      .isEmpty(),
    check("contactSubject", "Subject tidak boleh kosong")
      .not()
      .isEmpty(),
    check("contactContent", "Komentar tidak boleh kosong")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newContactUS = new ContactUS({
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        contactSubject: req.body.contactSubject,
        contactContent: req.body.contactContent,
        isReply: "NO",
        ipAddress: ip.address()
      });

      const saveContactUS = await newContactUS.save();

      res.status(200).json({
        success: true,
        msg: "Terima kasih, Kami akan merespon segera atas komentar Anda"
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, msg: "Gagal, silahkan Anda mencoba lagi" });
    }
  }
);

module.exports = router;
