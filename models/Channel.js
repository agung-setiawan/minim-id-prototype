const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  description: {
    type: String
  },
  isActive: {
    type: String,
    default: "YES"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Channel = mongoose.model("channel", ChannelSchema);
