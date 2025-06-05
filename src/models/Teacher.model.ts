import  { model, models, Schema, Model, Types  } from "mongoose";

// 🔹 Teacher Interface
export interface ITeacher extends Document {
  _id?: Types.ObjectId; // Optional for new documents
  user: Types.ObjectId; 
  subjects: Types.ObjectId[];
  lessons: Types.ObjectId[];
  classes: Types.ObjectId[];
}

// 🔹 Teacher Schema
const TeacherSchema = new Schema<ITeacher>(
  {
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    subjects: [{ type: Schema.Types.ObjectId, ref: "subjects" }],
    lessons: [{ type: Schema.Types.ObjectId, ref: "lessons" }],
    classes: [{ type: Schema.Types.ObjectId, ref: "classes" }],
  },
  { timestamps: true }
);

// 🔹 Teacher Model Export
const Teacher : Model<ITeacher> = models.teachers || model("teachers", TeacherSchema);
export default Teacher;