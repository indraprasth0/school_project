import { model, models, Schema, Model } from 'mongoose';

// 🔹 Location Interface
export interface ILocation extends Document {
  country: string;
  states: {
    name: string;
    districts: {
      name: string;
      talukas: {
        name: string;
        places: string[];
      }[];
    }[];
  }[];
}

// 🔹 Location Schema
const LocationSchema = new Schema<ILocation>({
  country: { type: String, required: true, unique: true },
  states: [
    {
      name: { type: String, required: true },
      districts: [
        {
          name: { type: String, required: true },
          talukas: [
            {
              name: { type: String, required: true },
              places: { type: [String], required: true }
            }
          ]
        }
      ]
    }
  ]
});

const Location: Model<ILocation> = models.locations || model("locations", LocationSchema);
export default Location;