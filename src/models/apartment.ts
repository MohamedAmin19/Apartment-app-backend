import mongoose, { Document } from 'mongoose';

export interface IApartment extends Document {
    title: string;
    location: string;
    price: number;
    description: string;
    imageUrls: string[];
}

const ApartmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrls: [{ type: String }]
});

export const Apartment = mongoose.model<IApartment>('Apartment', ApartmentSchema);
