const mongoose = require("mongoose");
const ContactUSSchema = new mongoose.Schema({
  contactName: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String
  },
  contactSubject: {
    type: String,
    required: true
  },
  contactContent: {
    type: String,
    required: true
  },
  isReply: {
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

module.exports = ContactUS = mongoose.model("contact_us", ContactUSSchema);
