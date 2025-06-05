import { model, models, Schema, Model, Types } from 'mongoose';

export interface IStudent extends Document {
  _id?: Types.ObjectId; // Optional for new documents
    user: Types.ObjectId; 
    parent: Types.ObjectId;
    class: Types.ObjectId;
    grade: Types.ObjectId;
    attendances: Types.ObjectId[];
    results: Types.ObjectId[];
  }
  
  const StudentSchema = new Schema<IStudent>(
    {
      user: { type: Schema.Types.ObjectId, ref: "users", required: true },
      parent: { type: Schema.Types.ObjectId, ref: "parents" }, 
      class: { type: Schema.Types.ObjectId, ref: "classes", required: true },
      grade: { type: Schema.Types.ObjectId, ref: "grades", required: true },
      attendances: [{ type: Schema.Types.ObjectId, ref: "attendances" }],
      results: [{ type: Schema.Types.ObjectId, ref: "results" }],
    },
    { timestamps: true }
  );
  
 const Student: Model<IStudent> = models.students || model("students", StudentSchema);
 export default Student; 