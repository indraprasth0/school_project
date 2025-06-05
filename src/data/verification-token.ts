"use server";

import { connectDB } from "@/lib/connectDB";
import VerificationToken, { IVerificationToken } from "@/models/VerificationToken.model";

// Get verification token by token value
export const getVerificationTokenByToken = async (
  token: string
): Promise<IVerificationToken | null> => {

      await connectDB().catch((error) => {
        console.error("Failed to connect to the database:", error);
        throw new Error("Database connection error");
      });
  
  try {
    const verificationToken = await VerificationToken.findOne({ token });
    return verificationToken;
  } catch (error) {
    console.error("Error fetching verification token by token:", error);
    return null;
  }
};

// Get verification token by identifier (email)
export const getVerificationTokenByIdentifier = async (
  identifier: string
): Promise<IVerificationToken | null> => {

      await connectDB().catch((error) => {
        console.error("Failed to connect to the database:", error);
        throw new Error("Database connection error");
      });
  
  try {
    const verificationToken = await VerificationToken.findOne({ identifier });
    return verificationToken;
  } catch (error) {
    console.error("Error fetching verification token by identifier:", error);
    return null;
  }
};