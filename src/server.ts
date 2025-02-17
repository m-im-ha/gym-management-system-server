import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app = express();
app.use(express.json());

// connect to mongoDB
connectDB();

app.get("/",(req : Request,res: Response)=>{
    res.send("GYM management system is running!!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
});
