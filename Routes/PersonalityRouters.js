const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');
const PersonalityModel = require('../Models/Personality');

const router = express.Router();

// Fetch all personalities
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const personalities = await PersonalityModel.find();
        res.status(200).json(personalities);
    } catch (err) {
        res.status(500).json({ message: "Error fetching personalities", success: false });
    }
});

// Fetch personality by ID
router.get('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters
        const personality = await PersonalityModel.findById(id); // Use findById to fetch the personality
        if (!personality) {
            return res.status(404).json({ message: "Personality not found", success: false });
        }
        res.status(200).json(personality); // Return the personality details
    } catch (err) {
        res.status(500).json({ message: "Error fetching personality details", success: false });
    }
});

// Add a new personality
router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        const { name, image, description } = req.body;
        const newPersonality = new PersonalityModel({ name, image, description });
        await newPersonality.save();
        res.status(201).json({ message: "Personality added successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: "Error adding personality", success: false });
    }
});

module.exports = router; 
