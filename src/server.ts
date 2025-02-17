import { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";

dotenv.config();

// connect to mongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
});
