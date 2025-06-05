import { model, models, Schema, Model, Types } from 'mongoose';

export interface IParent extends Document {
    user: Types.ObjectId; // User Reference
    students: Types.ObjectId[];
  }
  
  const ParentSchema = new Schema<IParent>(
    {
      user: { type: Schema.Types.ObjectId, ref: "users", required: true },
      students: [{ type: Schema.Types.ObjectId, ref: "students" }],
    },
    { timestamps: true }
  );
  
  const Parent:Model<IParent> = models.parents || model("parents", ParentSchema);
  export default Parent; 