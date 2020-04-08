const mongoose = require("mongoose");
const PageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Page = mongoose.model("page", PageSchema);
