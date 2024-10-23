// routes/YogaRouter.js
const express = require('express');
const router = express.Router();
const YogaModel = require('../Models/Yoga'); // Adjust according to your model

// Add a new yoga session
router.post('/', async (req, res) => {
    try {
        const yoga = new YogaModel(req.body); // Using the form data
        await yoga.save();
        res.status(201).json({ success: true, message: 'Yoga session added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add yoga session', error });
    }
});


// Fetch all yoga sessions
router.get('/', async (req, res) => {
    try {
        const yogas = await YogaModel.find();
        res.json(yogas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching yogas', error });
    }
});

// Fetch a yoga session by ID
router.get('/:id', async (req, res) => {
    try {
        const yoga = await YogaModel.findById(req.params.id);
        if (!yoga) return res.status(404).json({ message: 'Yoga not found' });
        res.json(yoga);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching yoga', error });
    }
});

module.exports = router;
