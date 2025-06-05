"use server";
import TwoFactorConfirmation from "@/models/twoFactorConfirmation.model";
import { ITwoFactorConfirmation } from "@/models/twoFactorConfirmation.model";

export const getTwoFactorConfirmationByUserId = async (
  userId: string
): Promise<ITwoFactorConfirmation | null> => {
  try {
    const confirmation = await TwoFactorConfirmation.findOne({ userId });    
    return confirmation;
  } catch (error) {
    console.error("Error fetching two-factor confirmation by userId:", error);
    return null;
  }
};

export const deleteTwoFactorConfirmationByUserId = async (
  userId: string
): Promise<ITwoFactorConfirmation | null> => {
  try {
    await TwoFactorConfirmation.deleteOne({ userId });
    return null;    
  } catch (error) {
    console.error("Error fetching two-factor confirmation by userId:", error);
    return null;
  }
};