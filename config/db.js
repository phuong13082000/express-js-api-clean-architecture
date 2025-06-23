import {config} from "dotenv";
import mongoose from "mongoose";

config();

if (!process.env.MONGODB_URI) {
    throw new Error("Please provide MONGODB_URI in the .env file")
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected!");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

export default connectDB;
