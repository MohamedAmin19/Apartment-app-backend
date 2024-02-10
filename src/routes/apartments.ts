import { Router } from 'express';
import { Apartment } from '../models/apartment';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// List all apartments
router.get('/', async (req, res) => {
    const apartments = await Apartment.find();
    res.json(apartments);
});

// Get apartment details
router.get('/:id', async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);
        if (apartment) {
            res.json(apartment);
        } else {
            res.status(404).send('Apartment not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add an apartment and upload image
router.post('/', upload.array('images'), async (req, res) => {
    try {
        // Upload images to Cloudinary and get their URLs
        const files: Express.Multer.File[] = req.files as Express.Multer.File[];
        const uploadedImages = await Promise.all(files.map(async file => {
            const result = await cloudinary.uploader.upload(file.path, { folder: "apartments" });
            return result.secure_url;
        }));

        // Create a new apartment document with image URLs
        const apartment = new Apartment({
            title: req.body.title,
            location: req.body.location,
            price: req.body.price,
            description: req.body.description,
            imageUrls: uploadedImages
        });

        // Save the apartment to the database
        await apartment.save();

        res.status(201).json(apartment);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
