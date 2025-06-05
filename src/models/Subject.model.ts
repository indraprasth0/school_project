import { model, models, Schema, Model, Types } from 'mongoose';

export interface ISubject extends Document {
    name: string;
    teachers: Types.ObjectId[];
    lessons: Types.ObjectId[];    
  }

const SubjectSchema = new Schema<ISubject>(
    {
      name: { type: String, unique: true, required: true },
      teachers: [{ type: Schema.Types.ObjectId, ref: "teachers" }],
      lessons: [{ type: Schema.Types.ObjectId, ref: "lessons" }],
    },
    { timestamps: true }
  );

  const Subject:Model<ISubject> = models.subjects || model("subjects", SubjectSchema);
  export default Subject;  