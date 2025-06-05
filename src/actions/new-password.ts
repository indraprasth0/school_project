"use server"

import * as z from "zod"
import bcryptjs from 'bcryptjs';

import { connectDB } from "@/lib/connectDB";
import { NewPasswordSchema } from "@/schemas"
import { getUserByEmailWithPassword } from "@/data/user"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import User from "@/models/userModel";
import passwordresettoken from "@/models/PasswordResetToken. model";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
  if (!token) return { error: "Missing Token!" }

  connectDB().catch((err) => {
    throw new Error("Cannot connect to DB", err.message);
  });

  const validatedFields = NewPasswordSchema.safeParse(values)
  if (!validatedFields.success) return { error: "Invalid field!" }

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "Invalid Token!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmailWithPassword(existingToken.identifier);
  if (!existingUser) return { error: "Email does not exist!" };

  const { password } = validatedFields.data
  const hashedPassword = await bcryptjs.hash(password, 10)

  if (!existingUser.password) {
    console.error("Password field not found for user:", existingUser.email);
  }

  await User.updateOne(
    { _id: existingUser.id },
    {
      $set: {
        password: hashedPassword,
      }
    }
  );

  console.log("User password updated:", existingUser.email)

  await passwordresettoken.deleteOne({
    _id: existingToken._id
  })

  return { success: "Password updated!" }
}