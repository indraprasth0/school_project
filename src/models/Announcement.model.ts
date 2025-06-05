import { model, models, Schema, Model, Types } from 'mongoose';

// 🔹 Announcement Interface
export interface IAnnouncement extends Document {
  _id?: Types.ObjectId; 
  title: string;
  description: string;
  date: Date;
  class?: Types.ObjectId;
}

// 🔹 Announcement Schema
const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now }, 
    class: { type: Schema.Types.ObjectId, ref: "classes" }, 
  },
  { timestamps: true } 
);

const Announcement:Model<IAnnouncement> = models.announcements ||
  model("announcements", AnnouncementSchema);
export default Announcement;