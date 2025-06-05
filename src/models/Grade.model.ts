import { model, models, Schema, Model, Types } from 'mongoose';

// 🔹 Grade Interface
export interface IGrade extends Document {
  level: number;
  section?: string; 
  students: Types.ObjectId[];
  classes: Types.ObjectId[];
}

// 🔹 Grade Schema
const GradeSchema = new Schema<IGrade>(
  {
    level: { type: Number, required: true, unique: true },
    section: { type: String, default: "A" },
    students: [{ type: Schema.Types.ObjectId, ref: "students" }],
    classes: [{ type: Schema.Types.ObjectId, ref: "classes" }],
  },
  { timestamps: true }
);

const Grade: Model<IGrade> = models.grades || model("grades", GradeSchema);
export default Grade;