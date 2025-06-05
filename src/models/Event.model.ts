import { model, models, Schema, Model, Types } from 'mongoose';

// 🔹 Event Interface
export interface IEvent {
  _id?: Types.ObjectId; // Optional for new documents
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  class?: Types.ObjectId;
}

// 🔹 Event Schema
const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    location: { type: String, trim: true }, 
    class: { type: Schema.Types.ObjectId, ref: "classes" }, 
  },
  { timestamps: true } 
);

const Event: Model<IEvent> = models.events || model("events", EventSchema);
export default Event;