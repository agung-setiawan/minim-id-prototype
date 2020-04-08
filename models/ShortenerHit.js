const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShortenerHitSchema = new Schema({
  shortener: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shortener"
  },
  count: {
    type: String
  },
  ipAddress: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ShortenerHit = mongoose.model(
  "shortenerhit",
  ShortenerHitSchema
);
