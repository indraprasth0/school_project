import { model, models, Schema, Types } from "mongoose";

const AccountSchema = new Schema({
  _id: Types.ObjectId,
  userId: Schema.Types.ObjectId,
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
}, { timestamps: true })

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const Account = models.accounts || model("accounts", AccountSchema);
export default Account;