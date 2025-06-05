import { model, models, Schema, Model, Types } from 'mongoose';

// 🔹 Enum for Assignment Status
const AssignmentStatusEnum = ["PENDING", "SUBMITTED", "GRADED"] as const;
type AssignmentStatus = (typeof AssignmentStatusEnum)[number];

// 🔹 Assignment Interface
export interface IAssignment extends Document {
  title: string;
  description?: string;
  startDate: Date;
  dueDate: Date;
  status: AssignmentStatus;
  lesson: Types.ObjectId;
  results: Types.ObjectId[];
}

// 🔹 Assignment Schema
const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: AssignmentStatusEnum, default: "PENDING" },
    lesson: { type: Schema.Types.ObjectId, ref: "lessons", required: true },
    results: [{ type: Schema.Types.ObjectId, ref: "results" }],
  },
  { timestamps: true }
);

const Assignment:Model<IAssignment> = models.assignments || model("assignments", AssignmentSchema);
export default Assignment;