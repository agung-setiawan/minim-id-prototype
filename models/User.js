const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  selfDescription: {
    type: String,
    default: null
  },
  gender: {
    type: String,
    default: "L"
  },
  avatar: {
    type: String
  },
  refCode: {
    type: String
  },
  regFrom: {
    type: String
  },
  apiKey: {
    type: String,
    default: null
  },
  ipAddress: {
    type: String
  },
  logoutDate: {
    type: Date,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
