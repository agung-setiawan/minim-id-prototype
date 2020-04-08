const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShortenerSchema = new Schema({
  user: {
    type: String
  },
  channelID: {
    type: String,
    default: 0
  },
  url: {
    type: String,
    required: true
  },
  shorten: {
    type: String
  },
  title: {
    type: String
  },
  slug: {
    type: String
  },
  summary: {
    type: String
  },
  image: {
    type: String
  },
  showType: {
    type: String
  },
  showCount: {
    type: String
  },
  shortenCode: {
    type: String
  },
  isApproved: {
    type: String
  },
  ipAddress: {
    type: String
  },
  clicked: {
    type: Number
  },
  mth: {
    type: String
  },
  yrs: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Shortener = mongoose.model("shortener", ShortenerSchema);
