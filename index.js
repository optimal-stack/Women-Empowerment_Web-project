const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const mongoose = require("mongoose");
const StoryRouter = require('./Routes/StoryRouters');
const PersonalityRouter = require('./Routes/PersonalityRouters'); // Import the personality router
const YogaRouter = require('./Routes/YogaRouter'); // Import the yoga router



require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/stories', StoryRouter); // Use the story routes
app.use('/personalities', PersonalityRouter); // Use the personality routes
app.use('/yogas', YogaRouter); // Use the yoga routes

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})