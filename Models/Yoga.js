// models/Yoga.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const YogaSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    video: {
        type: String, // URL to the video
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL to the yoga image
        required: true,
    },
});

const YogaModel = mongoose.model('yogas', YogaSchema);
module.exports = YogaModel;
