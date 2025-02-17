import express from "express";
import {
  createClassSchedule,
  bookClass,
  cancelBooking,
  getTrainerSchedules,
} from "../controllers/classController";
import { protect, authorize } from "../middleware/auth";
import { createScheduleValidation } from "../validations/classSchedule.validation";

const router = express.Router();

router.post("/", [
  protect,
  authorize(["admin"]),
  createScheduleValidation,
  createClassSchedule,
]);

router.post("/:scheduleId/book", [protect, authorize(["trainee"]), bookClass]);

// Get trainer's schedules
router.get("/trainer-schedules", [
  protect,
  authorize(["trainer"]),
  getTrainerSchedules,
]);

// Cancel booking
router.delete("/:scheduleId/cancel-booking", [
  protect,
  authorize(["trainee"]),
  cancelBooking,
]);

export default router;
