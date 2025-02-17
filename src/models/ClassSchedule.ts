import mongoose, { Document, Schema } from "mongoose";

// ClassSchedule interface
export interface IClassSchedule extends Document {
  date: Date;
  startTime: string;
  endTime: string;
  trainer: mongoose.Types.ObjectId;
  trainees: mongoose.Types.ObjectId[];
}

// ClassSchedule schema
const ClassScheduleSchema: Schema = new Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  trainer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  trainees: [{ type: Schema.Types.ObjectId, ref: "User" }],
});


export default mongoose.model<IClassSchedule>(
  "ClassSchedule",
  ClassScheduleSchema
);
