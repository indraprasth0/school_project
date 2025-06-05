import { model, models, Schema, Model, Types } from 'mongoose';

// 🔹 Enum for Exam Types
const ExamTypeEnum = ["UNIT_TEST", "SEMESTER", "FINAL", "MID_TERM"] as const;
type ExamType = (typeof ExamTypeEnum)[number];

// 🔹 Exam Interface
export interface IExam extends Document {
  title: string;
  description?: string;
  examType: ExamType;
  startTime: Date;
  endTime: Date;
  lesson: Types.ObjectId;
  results: Types.ObjectId[];
}

// 🔹 Exam Schema
const ExamSchema = new Schema<IExam>(
  {
    title: { type: String, required: true },
    description: { type: String },
    examType: { type: String, enum: ExamTypeEnum, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    lesson: { type: Schema.Types.ObjectId, ref: "lessons", required: true },
    results: [{ type: Schema.Types.ObjectId, ref: "results" }],
  },
  { timestamps: true }
);

const Exam: Model<IExam> = models.exams || model("exams", ExamSchema);
export default Exam;