
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("MONGO_URI is not defined in environment variables.");
        process.exit(1);
    }
    try {
    await mongoose.connect(uri);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
