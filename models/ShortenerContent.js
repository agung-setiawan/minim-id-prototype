const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShortenerContentSchema = new Schema({
    shortener: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shortener'
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = ShortenerContent = mongoose.model('shortenercontent', PostSchema);