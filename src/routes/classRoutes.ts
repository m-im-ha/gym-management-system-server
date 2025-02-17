import express from "express";
import { createClassSchedule } from "../controllers/classController";

const router = express.Router();

// create a new class schedule
router.post("/", createClassSchedule);

export default router;
