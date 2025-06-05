"use server"

import {connectDB} from "@/lib/connectDB"
import User from "@/models/userModel"
import verificationToken from "@/models/VerificationToken.model";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

interface VerificationResponse {
    success?: string;
    error?: string;
}

export const newVerification = async (token: string): Promise<VerificationResponse> => {
  try {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) return { error: "Token does not exist!" };

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { error: "Token has expired!" };
    
    await connectDB().catch((error) => {
      console.error("Failed to connect to the database:", error);
      throw new Error("Database connection error");
    });

    const existingUser = await getUserByEmail(existingToken.identifier);
    if (!existingUser) return { error: "Email does not exist!" };
    
    console.log("existingUser:", existingUser);

    await User.updateOne(
      { _id: existingUser.id },
      {
        $set: {
          emailVerified: new Date(),
          email: existingToken.identifier,          
        }
      }
    );
    console.log("User email verified:", existingUser.email, existingUser.emailVerified);
     
    await verificationToken.deleteOne({ _id: existingToken._id });

    return { success: "Email verified!" };
  } catch (error) {
    console.error("Error during email verification:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
};
