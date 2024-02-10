import mongoose from 'mongoose';

// const MONGO_URI = 'mongodb://localhost:27017/apartmentsApp';
const MONGO_URI = 'mongodb+srv://amin44061:I6dHxWKlCdFqbRSG@apartment-app-db.zbdtb9m.mongodb.net/?retryWrites=true&w=majority';

export const connectToDatabase = () => {
    mongoose.connect(MONGO_URI)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('Could not connect to MongoDB:', err));
  };
