import {model, models, Model, Schema, Types, } from "mongoose";

export interface ITwoFactorToken {
  _id?: Types.ObjectId;
  token: string;
  identifier: string; 
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TwoFactorTokenSchema = new Schema<ITwoFactorToken>(
  {
    token: { type: String, required: true },
    identifier: { type: String, required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true }
);

const TwoFactorToken : Model<ITwoFactorToken> = models.twofactortokens || model("twofactortokens", TwoFactorTokenSchema);
export default TwoFactorToken;