import {model, models, Model, Schema, Types} from "mongoose";

export interface IVerificationToken {
  _id?: Types.ObjectId;
  identifier: string;
  token: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VerificationTokenSchema = new Schema<IVerificationToken>(
  {
    identifier: { type: String, required: true },
    token: { type: String, required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true }
);

const VerificationToken: Model<IVerificationToken> = models.verificationtokens || model("verificationtokens", VerificationTokenSchema);
export default VerificationToken;