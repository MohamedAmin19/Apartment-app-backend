"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apartment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApartmentSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrls: [{ type: String }]
});
exports.Apartment = mongoose_1.default.model('Apartment', ApartmentSchema);
