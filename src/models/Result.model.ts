import { model, models, Schema, Model, Types } from 'mongoose';

// 🔹 Result Interface
export interface IResult extends Document {
  _id?: Types.ObjectId; // Optional for new documents
  score: number;
  remarks?: string;
  exam?: Types.ObjectId;
  assignment?: Types.ObjectId;
  student: Types.ObjectId;
  gradedAt: Date;
}

// 🔹 Result Schema
const ResultSchema = new Schema<IResult>(
  {
    score: { type: Number, required: true, min: 0, max: 100 },
    remarks: { type: String },
    exam: { type: Schema.Types.ObjectId, ref: "exams" },
    assignment: { type: Schema.Types.ObjectId, ref: "assignments" },
    student: { type: Schema.Types.ObjectId, ref: "students", required: true }, 
    gradedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Result:Model<IResult> =  models.results || model("results", ResultSchema);
export default Result;