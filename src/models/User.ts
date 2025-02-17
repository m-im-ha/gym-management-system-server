import mongoose, { Document, Schema } from "mongoose";

// User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "trainer" | "trainee";
}

// User schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "trainer", "trainee"], required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
