import { Request, Response } from "express";
import { ClassSchedule, User } from "../models";


// create new class schedule
export const createClassSchedule = async (req: Request, res: Response): Promise<void> => {
  const { date, startTime, endTime, trainer } = req.body;

  try {
    // check if the trainer exists
    const trainerExists = await User.findById(trainer);
    if (!trainerExists || trainerExists.role !== "trainer") {
      res.status(400).json({ message: "Invalid trainer" });
      return;
    }

    // create a new class schedule
    const classSchedule = new ClassSchedule({
      date,
      startTime,
      endTime,
      trainer,
    });
    await classSchedule.save();

    res.status(201).json({ message: "Class schedule created successfully", classSchedule });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

