import { model, models, Schema, Model, Types } from 'mongoose';

export interface IClass extends Document {
  _id?: Types.ObjectId; // Optional for new documents
    name: string;
    capacity: number;
    supervisor?: Types.ObjectId;
    lessons: Types.ObjectId[];
    students: Types.ObjectId[];
    grade: Types.ObjectId;
    events: Types.ObjectId[];
    announcements: Types.ObjectId[];
  }
  
  const ClassSchema = new Schema<IClass>(
    {
      name: { type: String, unique: true, required: true },
      capacity: { type: Number, required: true },
      supervisor: { type: Schema.Types.ObjectId, ref: "teachers" },
      lessons: [{ type: Schema.Types.ObjectId, ref: "lessons" }],
      students: [{ type: Schema.Types.ObjectId, ref: "students" }],
      grade: { type: Schema.Types.ObjectId, ref: "grades", required: true },
      events: [{ type: Schema.Types.ObjectId, ref: "events" }],
      announcements: [{ type: Schema.Types.ObjectId, ref: "announcements" }],
    },
    { timestamps: true }
  );
  
  const Class:Model<IClass> = models.classes ||  model("classes", ClassSchema);
  export default Class; 