const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

module.exports = async function(req, res, next) {
  // Get API Key from header
  const keyToken = req.header("api-key");

  // Check if not token
  if (!keyToken) {
    return res
      .status(401)
      .json({ msg: "No API Key is exist, authorization denied" });
  }

  // Verify token
  try {
    const userData = await User.findOne({ apiKey: keyToken });

    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ msg: "API Key is not valid" });
  }
};
