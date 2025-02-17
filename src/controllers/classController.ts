import { Request, Response } from 'express';
import { ClassSchedule, User } from '../models';
import { ClassScheduleService } from '../services/classSchedule.service';
import { AuthRequest } from '../middleware/auth';
import { MAX_TRAINEES_PER_CLASS } from '../utils/constants';

const validateScheduleInput = (date: string, startTime: string, endTime: string, trainer: string) => {
    const errors = [];

    // Validate date
    const scheduleDate = new Date(date);
    if (isNaN(scheduleDate.getTime())) {
        errors.push('Invalid date format');
    }

    // Validate time format (HH:mm)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(startTime)) {
        errors.push('Invalid start time format (HH:mm)');
    }
    if (!timeRegex.test(endTime)) {
        errors.push('Invalid end time format (HH:mm)');
    }

    // Validate MongoDB ObjectId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(trainer)) {
        errors.push('Invalid trainer ID');
    }

    return errors;
};

export const createClassSchedule = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { date, startTime, endTime, trainer } = req.body;

        // Validate input
        const validationErrors = validateScheduleInput(date, startTime, endTime, trainer);
        if (validationErrors.length > 0) {
            res.status(400).json({
                success: false,
                message: 'Validation error occurred.',
                errorDetails: validationErrors
            });
            return;
        }

        const scheduleDate = new Date(date);

        // Check if daily limit is reached
        const isLimitReached = await ClassScheduleService.checkDailyScheduleLimit(scheduleDate);
        if (isLimitReached) {
            res.status(400).json({
                success: false,
                message: 'Daily schedule limit reached',
                errorDetails: 'Maximum 5 classes per day allowed'
            });
            return;
        }

        // Check for time slot overlap
        const hasOverlap = await ClassScheduleService.checkTimeSlotOverlap(
            scheduleDate,
            startTime,
            endTime,
            trainer
        );
        if (hasOverlap) {
            res.status(400).json({
                success: false,
                message: 'Time slot overlap',
                errorDetails: 'Trainer already has a class scheduled in this time slot'
            });
            return;
        }

        const classSchedule = new ClassSchedule({
            date: scheduleDate,
            startTime,
            endTime,
            trainer,
            trainees: []
        });

        await classSchedule.save();

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Class schedule created successfully',
            data: classSchedule
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            errorDetails: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

export const bookClass = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { scheduleId } = req.params;
        const userId = req.user?.userId;

        const schedule = await ClassSchedule.findById(scheduleId);
        if (!schedule) {
            res.status(404).json({
                success: false,
                message: 'Class schedule not found'
            });
            return;
        }

        // Check if class is full
        if (schedule.trainees.length >= MAX_TRAINEES_PER_CLASS) {
            res.status(400).json({
                success: false,
                message: 'Class schedule is full',
                errorDetails: 'Maximum 10 trainees allowed per schedule'
            });
            return;
        }

        // Check if trainee is already booked
        if (schedule.trainees.includes(userId as any)) {
            res.status(400).json({
                success: false,
                message: 'Already booked',
                errorDetails: 'You have already booked this class'
            });
            return;
        }

        schedule.trainees.push(userId as any);
        await schedule.save();

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Class booked successfully',
            data: schedule
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            errorDetails: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

export const getTrainerSchedules = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
      const trainerId = req.user?.userId;
      
      const schedules = await ClassSchedule.find({ trainer: trainerId })
          .populate('trainees', 'name email')
          .sort({ date: 1, startTime: 1 });

      res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Trainer schedules retrieved successfully",
          data: schedules
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Something went wrong",
          errorDetails: error instanceof Error ? error.message : "Unknown error occurred"
      });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
      const { scheduleId } = req.params;
      const traineeId = req.user?.userId;

      const schedule = await ClassSchedule.findById(scheduleId);
      if (!schedule) {
          res.status(404).json({
              success: false,
              message: "Class schedule not found"
          });
          return;
      }

      // Check if trainee is actually booked in this class
      if (!schedule.trainees.includes(traineeId as any)) {
          res.status(400).json({
              success: false,
              message: "Booking not found",
              errorDetails: "You are not booked in this class"
          });
          return;
      }

      // Remove trainee from the schedule
      schedule.trainees = schedule.trainees.filter(
          (id) => id.toString() !== traineeId
      );
      await schedule.save();

      res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Booking cancelled successfully",
          data: schedule
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Something went wrong",
          errorDetails: error instanceof Error ? error.message : "Unknown error occurred"
      });
  }
};
