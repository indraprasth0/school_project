import { model, models, Schema, Model, Types } from 'mongoose';

export interface IAdmin extends Document {
  _id?: Types.ObjectId; 
    user: Types.ObjectId; // User Reference    
  }
  
  const AdminSchema = new Schema<IAdmin>(
    {
      user: { type: Schema.Types.ObjectId, ref: "users", required: true },      
    },
    { timestamps: true }
  );
    
const Admin:Model<IAdmin> = models.admins || model("admins", AdminSchema);
export default Admin; 