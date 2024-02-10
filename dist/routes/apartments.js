"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apartment_1 = require("../models/apartment");
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// List all apartments
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apartments = yield apartment_1.Apartment.find();
    res.json(apartments);
}));
// Get apartment details
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartment = yield apartment_1.Apartment.findById(req.params.id);
        if (apartment) {
            res.json(apartment);
        }
        else {
            res.status(404).send('Apartment not found');
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Add an apartment and upload image
router.post('/', upload.array('images'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Upload images to Cloudinary and get their URLs
        const files = req.files;
        const uploadedImages = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield cloudinary_1.v2.uploader.upload(file.path, { folder: "apartments" });
            return result.secure_url;
        })));
        // Create a new apartment document with image URLs
        const apartment = new apartment_1.Apartment({
            title: req.body.title,
            location: req.body.location,
            price: req.body.price,
            description: req.body.description,
            imageUrls: uploadedImages
        });
        // Save the apartment to the database
        yield apartment.save();
        // Respond with the created apartment including image URLs
        res.status(201).json(apartment);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
