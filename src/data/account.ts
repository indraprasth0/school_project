"use server";
import { connectDB } from "@/lib/connectDB";
import accounts from "@/models/Account.model";
import User from "@/models/userModel";


export const getAccountByUserId = async (userId: string) => {
    try {
        await connectDB().catch((error) => {
            console.error("Failed to connect to the database:", error);
            throw new Error("Database connection error");
        });

        const account = await accounts.findOne({ userId })

        if (!account) {
            console.log("Data account :: No account found for userId:", userId)
            return null
        }

        console.log("Data account :: Account found for userId:", userId, account)

        return account

    } catch (error) {
        console.error("Error getting account by userId:", error)
        return null
    }
}

export const getAccountByUserIdUpdate = async (userId: string) => {
    try {
        await connectDB().catch((error) => {
            console.error("Failed to connect to the database:", error);
            throw new Error("Database connection error");
        });

        const account = await User.findByIdAndUpdate(userId, {
            emailVerified: new Date(),
            role: "user",
            isTwoFactorEnabled: false,
        });

        if (!account) {
            console.log("Data account :: No account found for userId:", userId)
            return null
        }

        console.log("Data account :: Account found for userId:", userId, account)

        const plainObjectUser: { id: string } = {
            id: account._id.toString(),
        };

        return { success: true, data: plainObjectUser };        

    } catch (error) {
        console.error("Error getting account by userId:", error)
        return null
    }
}