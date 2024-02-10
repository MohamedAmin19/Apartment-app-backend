import express from 'express';
import bodyParser from 'body-parser';
import apartmentRoutes from './routes/apartments';
import { connectToDatabase } from './database';
import { v2 as cloudinary } from 'cloudinary';


// Load environment variables from .env file
require('dotenv').config();

// Configure Cloudinary with environment variables
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const cors = require('cors');
const PORT = 3001;

// Connect to MongoDB database
connectToDatabase();

app.use(cors());
app.use(bodyParser.json());
app.use('/apartments', apartmentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
