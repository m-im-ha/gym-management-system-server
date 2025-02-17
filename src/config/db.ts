import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI to work with DB");
}

async function connectDB() {
  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected : ${connect.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error : ${error.message}`);
    } else {
        console.error(`An unknown error occurred.`);
    }
    process.exit(1);
  }
}

export default connectDB;
