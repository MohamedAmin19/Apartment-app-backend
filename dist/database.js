"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// const MONGO_URI = 'mongodb://localhost:27017/apartmentsApp';
const MONGO_URI = 'mongodb+srv://amin44061:I6dHxWKlCdFqbRSG@apartment-app-db.zbdtb9m.mongodb.net/?retryWrites=true&w=majority';
const connectToDatabase = () => {
    mongoose_1.default.connect(MONGO_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Could not connect to MongoDB:', err));
};
exports.connectToDatabase = connectToDatabase;
