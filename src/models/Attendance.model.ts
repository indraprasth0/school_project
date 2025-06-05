import { model, models, Schema, Model, Types } from 'mongoose';

// 🔹 Attendance Interface
export interface IAttendance extends Document {
  date: Date;
  present: boolean;
  reason?: string;
  student: Types.ObjectId;
  lesson: Types.ObjectId;
}

// 🔹 Attendance Schema
const AttendanceSchema = new Schema<IAttendance>(
  {
    date: { type: Date, default: Date.now },
    present: { type: Boolean, required: true },
    reason: { type: String, trim: true },
    student: { type: Schema.Types.ObjectId, ref: "students", required: true }, 
    lesson: { type: Schema.Types.ObjectId, ref: "lessons", required: true },
  },
  { timestamps: true }
);

const Attendance: Model<IAttendance> = models.attendances || model("attendances", AttendanceSchema);
export default Attendance;