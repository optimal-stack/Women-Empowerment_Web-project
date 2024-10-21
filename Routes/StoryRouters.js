const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');
const StoryModel = require('../Models/Story');

const router = express.Router();

// Fetch all stories
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const stories = await StoryModel.find();
        res.status(200).json(stories);
    } catch (err) {
        res.status(500).json({ message: "Error fetching stories", success: false });
    }
});

// Fetch story by ID
router.get('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters
        const story = await StoryModel.findById(id); // Use findById to fetch the story
        if (!story) {
            return res.status(404).json({ message: "Story not found", success: false });
        }
        res.status(200).json(story); // Return the story details
    } catch (err) {
        res.status(500).json({ message: "Error fetching story details", success: false });
    }
});

// Add a new story with multiple images
router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        const { title, author, images, content } = req.body;

        // Check if all fields are provided
        if (!title || !author || !images || images.length === 0 || !content) {
            return res.status(400).json({ message: "All fields are required, including at least one image", success: false });
        }

        // Create a new story with multiple images
        const newStory = new StoryModel({ title, author, images, content });
        await newStory.save();

        res.status(201).json({ message: "Story added successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: "Error adding story", success: false });
    }
});

module.exports = router;
