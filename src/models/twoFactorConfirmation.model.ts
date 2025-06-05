import {model, models, Model, Schema, Types } from "mongoose";

export interface ITwoFactorConfirmation {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  
  createdAt: Date;
  updatedAt: Date;
}

const TwoFactorConfirmationSchema = new Schema<ITwoFactorConfirmation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const TwoFactorConfirmation : Model<ITwoFactorConfirmation> =  models.twofactorconfirmations || model("twofactorconfirmations", TwoFactorConfirmationSchema);
export default TwoFactorConfirmation;