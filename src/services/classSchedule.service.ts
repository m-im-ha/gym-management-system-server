import { ClassSchedule, User } from "../models";
import { MAX_CLASSES_PER_DAY } from "../utils/constants";

export class ClassScheduleService {
  static async checkDailyScheduleLimit(date: Date): Promise<boolean> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const scheduleCount = await ClassSchedule.countDocuments({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    return scheduleCount >= MAX_CLASSES_PER_DAY;
  }

  static async checkTimeSlotOverlap(
    date: Date,
    startTime: string,
    endTime: string,
    trainerId: string
  ): Promise<boolean> {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const scheduleStartTime = new Date(date);
    scheduleStartTime.setHours(startHour, startMinute, 0, 0);

    const scheduleEndTime = new Date(date);
    scheduleEndTime.setHours(endHour, endMinute, 0, 0);

    const overlappingSchedule = await ClassSchedule.findOne({
      date: date,
      $or: [
        {
          startTime: {
            $lt: endTime,
            $gte: startTime,
          },
        },
        {
          endTime: {
            $gt: startTime,
            $lte: endTime,
          },
        },
      ],
      trainer: trainerId,
    });

    return !!overlappingSchedule;
  }
}
