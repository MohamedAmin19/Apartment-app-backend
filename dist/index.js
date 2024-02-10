"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const apartments_1 = __importDefault(require("./routes/apartments"));
const database_1 = require("./database");
const cloudinary_1 = require("cloudinary");
// Load environment variables from .env file
require('dotenv').config();
// Configure Cloudinary with environment variables
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Create Express app
const app = (0, express_1.default)();
const cors = require('cors');
const PORT = 3001;
// Connect to MongoDB database
(0, database_1.connectToDatabase)();
app.use(cors());
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
// Routes
app.use('/apartments', apartments_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
