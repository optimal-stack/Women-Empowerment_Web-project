// models/Personality.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL to the image
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const PersonalityModel = mongoose.model('personalities', PersonalitySchema);
module.exports = PersonalityModel;
