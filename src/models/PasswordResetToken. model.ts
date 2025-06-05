import {model, models, Model, Schema, Types} from "mongoose";

export interface IPasswordResetToken {
  _id?: Types.ObjectId;
  identifier: string; 
  token: string;
  expires: Date;
}

const PasswordResetTokenSchema = new Schema<IPasswordResetToken>(
  {
    identifier: { type: String, required: true },
    token: { type: String, required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true }
);

const PasswordResetToken: Model<IPasswordResetToken> = models.passwordresettokens ||model("passwordresettokens", PasswordResetTokenSchema);
export default PasswordResetToken;