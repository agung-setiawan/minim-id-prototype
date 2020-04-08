const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShortenersClicksSchema = new Schema({
  shortenerId: {
    type: String
  },
  clicked: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ShortenersClicks = mongoose.model(
  "shortener_clicks",
  ShortenersClicksSchema
);
