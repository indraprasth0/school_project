"use server";

import { connectDB } from "@/lib/connectDB";
import twoFactorToken, { ITwoFactorToken } from "@/models/twoFactorToken.model";

// Get two-factor token by token value
export const getTwoFactorTokenByToken = async (
  token: string
): Promise<ITwoFactorToken | null> => {
  try {
    
        await connectDB().catch((error) => {
          console.error("Failed to connect to the database:", error);
          throw new Error("Database connection error");
        });
    
    const userTwoFactorToken = await twoFactorToken.findOne({ token });
    return userTwoFactorToken;
  } catch (error) {
    console.error("Error fetching two-factor token by token:", error);
    return null;
  }
};

// Get two-factor token by identifier (email)
export const getTwoFactorTokenByIdentifier = async (
  email: string
): Promise<ITwoFactorToken | null> => {
  try {
    
    await connectDB().catch((error) => {
      console.error("Failed to connect to the database:", error);
      throw new Error("Database connection error");
    });

    const userTwoFactorToken = await twoFactorToken.findOne({
      identifier: email,
    });
    return userTwoFactorToken;
  } catch (error) {
    console.error("Error fetching two-factor token by identifier:", error);
    return null;
  }
};

