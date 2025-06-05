"use server";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { connectDB } from "@/lib/connectDB";
import TwoFactorToken from "@/models/twoFactorToken.model";
import PasswordResetToken from "@/models/PasswordResetToken. model";
import VerificationToken from "@/models/VerificationToken.model";
import { getVerificationTokenByIdentifier } from "@/data/verification-token";
import { getPasswordResetTokenByIdentifier } from "@/data/password-reset-token";
import { getTwoFactorTokenByIdentifier } from "@/data/two-factor-token";

// Generate 2FA token (6-digit code)
export const generateTwoFactorToken = async (email: string) => {
  try {

    await connectDB().catch((error) => {
      console.error("Failed to connect to the database:", error);
      throw new Error("Database connection error");
    });

    const existingToken = await getTwoFactorTokenByIdentifier(email);
    if (existingToken) {
      await TwoFactorToken.deleteOne({ _id: existingToken._id });
    }

    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    const result = await new TwoFactorToken({
      identifier: email,
      token,
      expires,
    });

    if (!result) {
      console.error("Failed to create 2FA token");
      return null;
    }
    result.save();
    console.log("2FA token saved:", result);

    return { identifier: email, token, expires, _id: result._id };
  } catch (error) {
    console.error("Error generating two-factor token:", error);
    return null;
  }
};

// Generate Password Reset Token (UUID)
export const generatePasswordResetToken = async (email: string) => {
  try {

    await connectDB().catch((error) => {
      console.error("Failed to connect to the database:", error);
      throw new Error("Database connection error");
    });

    const existingToken = await getPasswordResetTokenByIdentifier(email);
    if (existingToken) {
      await PasswordResetToken.deleteOne({ _id: existingToken._id });
    }

    const token = uuidv4();
    const expires = new Date(Date.now() + 3600000); // 1 hour

    const result = await new PasswordResetToken({
      identifier: email,
      token,
      expires,
    });

    if (!result) {
      console.error("Failed to create password reset token");
      return null;
    }
    result.save();
    console.log("Password reset token saved:", result);

    return { identifier: email, token, expires, _id: result._id };
  } catch (error) {
    console.error("Error generating password reset token:", error);
    return null;
  }
};

// Generate Email Verification Token (UUID)
export const generateVerificationToken = async (email: string) => {
  try {

    await connectDB().catch((error) => {
      console.error("Failed to connect to the database:", error);
      throw new Error("Database connection error");
    });

    const existingToken = await getVerificationTokenByIdentifier(email);
    if (existingToken) {
      await VerificationToken.deleteOne({ _id: existingToken._id });
    }

    const token = uuidv4();
    const expires = new Date(Date.now() + 3600000); // 1 hour

    const result = await new VerificationToken({
      identifier: email,
      token,
      expires,
    });

    if (!result) {
      console.error("Failed to create verification token");
      return null;
    }

    result.save();
    console.log("Verification token saved:", result);


    return { identifier: email, token, expires, _id: result._id };
  } catch (error) {
    console.error("Error generating verification token:", error);
    return null;
  }
};