import { model, models, Schema, Model, Types } from 'mongoose';

export interface ILesson extends Document {
  _id?: Types.ObjectId; // Optional for new documents
  name: string;
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY";
  startTime: Date;
  endTime: Date;
  subject: Types.ObjectId;
  class: Types.ObjectId;
  teacher: Types.ObjectId;
  exams: Types.ObjectId[];
  assignments: Types.ObjectId[];
  attendances: Types.ObjectId[];
}

const LessonSchema = new Schema<ILesson>(
  {
    name: { type: String, required: true },
    day: {
      type: String,
      enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
      required: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    subject: { type: Schema.Types.ObjectId, ref: "subjects", required: true },
    class: { type: Schema.Types.ObjectId, ref: "classes", required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "teachers", required: true }, 
    exams: [{ type: Schema.Types.ObjectId, ref: "exams" }],
    assignments: [{ type: Schema.Types.ObjectId, ref: "assignments" }],
    attendances: [{ type: Schema.Types.ObjectId, ref: "attendances" }],
  },
  { timestamps: true }
);

const Lesson:Model<ILesson> =  models.lessons || model("lessons", LessonSchema);
export default Lesson;