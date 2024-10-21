// Models/Story.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    images: {
        type: [String],  // Array of image URLs
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const StoryModel = mongoose.model('stories', StorySchema);
module.exports = StoryModel;
