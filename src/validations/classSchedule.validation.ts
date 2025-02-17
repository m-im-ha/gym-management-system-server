import { Request, Response, NextFunction } from "express";

export const createScheduleValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, startTime, endTime, trainer } = req.body;
  const errors = [];

  // Validate date
  const isValidDate = !isNaN(Date.parse(date));
  if (!isValidDate) {
    errors.push("Invalid date format");
  }

  // Validate time format (HH:mm)
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(startTime)) {
    errors.push("Invalid start time format (HH:mm)");
  }
  if (!timeRegex.test(endTime)) {
    errors.push("Invalid end time format (HH:mm)");
  }

  // Validate MongoDB ObjectId format
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(trainer)) {
    errors.push("Invalid trainer ID");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation error occurred.",
      errorDetails: errors,
    });
  }

  next();
};
