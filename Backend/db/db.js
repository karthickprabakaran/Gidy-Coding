import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connection Successful..");
    } catch (error) {
        console.error("Database Connection Failed: ", error);
    }
};

export default dbConnection;