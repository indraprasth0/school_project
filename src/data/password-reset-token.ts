import PasswordResetTokenModel from "@/models/PasswordResetToken. model"; 
import { connectDB } from "@/lib/connectDB";

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
    
    await connectDB().catch((error) => {
      console.error("Failed to connect to the database:", error);
      throw new Error("Database connection error");
    });
      
    const passwordResetToken = await PasswordResetTokenModel.findOne({ token });
    if (!passwordResetToken) {
      console.error("No password reset token found for the provided token.");
      return null;
    }
    console.log("Password reset token found:", passwordResetToken);
    return passwordResetToken;
  } catch (error) {
    console.error("Error fetching token by token:", error);
    return null;
  }
};

export const getPasswordResetTokenByIdentifier = async (identifier: string) => {
  try {
    
    await connectDB().catch((error) => {
      console.error("Failed to connect to the database:", error);
      throw new Error("Database connection error");
    });

    const passwordResetToken = await PasswordResetTokenModel.findOne({ identifier });
    if (!passwordResetToken) {
      console.error("No password reset token found for the provided identifier.");
      return null;
    }
    console.log("Password reset token found:", passwordResetToken);
    return passwordResetToken;
  } catch (error) {
    console.error("Error fetching token by identifier:", error);
    return null;
  }
};
