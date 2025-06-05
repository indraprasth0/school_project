import { model, models, Schema, Model, Types } from 'mongoose';
import { UserRole } from '@/types/auth.user';

export interface IUser {
    _id: Types.ObjectId; // 🔑 MongoDB Object ID
    id: string; // 🔑 Virtual ID
    userName: string;
    name: string;
    email: string;
    password: string;
    emailVerified: Date | null;    
    isAdmin: boolean;    
    image?: string;
    provider: 'google' | 'github' | 'credentials';
    role: UserRole; // 🔑 User role (e.g., 'user', 'admin')    
    twoFactorSecret?: string;      // 🔐 Optional: for 2FA support
    isTwoFactorEnabled?: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: [true, "Email is required"], match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Invalid email address",], lowercase: true, trim: true },
    password: { type: String, select: false },
    emailVerified: { type: Date, default: null },    
    isAdmin: { type: Boolean, default: false },
    image: { type: String, default: null },
    provider: { type: String, enum: ['google', 'github', 'credentials'], default: 'credentials' },
    role: { type: String, enum: Object.values(UserRole), default: 'user' },
    twoFactorSecret: { type: String, default: null }, // 🔐 Optional: for 2FA support    
    isTwoFactorEnabled: { type: Boolean, default: false }, // 🔐 Optional: for 2FA support
},
    { timestamps: true, }
)

UserSchema.virtual("id").get(function () {
  return (this._id as Types.ObjectId).toHexString()
})

// ✅ Include virtuals when converting to JSON
UserSchema.set("toJSON", {
  virtuals: true,
})


const User: Model<IUser> = models.users || model('users', UserSchema);

export default User;