"use server"
import * as z from "zod"
import { AuthError } from "next-auth"
import { signIn } from "@/auth"
import bcrypt from "bcryptjs"

import { connectDB } from "@/lib/connectDB"
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail"
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens"
import TwoFactorConfirmation from "@/models/twoFactorConfirmation.model"
import TwoFactorToken from "@/models/twoFactorToken.model"
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { getTwoFactorTokenByIdentifier } from "@/data/two-factor-token"
import { getUserByEmailWithPassword } from "@/data/user"

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  await connectDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection error");
  });

  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) return { error: "Login action :: Invalid input fields!" }

  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmailWithPassword(email)  

  if (!existingUser || !existingUser.password) return { error: "Login action :: User not found" }
  // console.log("existingUser:", existingUser);
  
  const isPasswordValid = await bcrypt.compare(password, existingUser.password)
  if (!isPasswordValid) return { error: "Login action :: Invalid credentials!" }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)
    if (verificationToken) {
      await sendVerificationEmail(verificationToken.identifier, verificationToken.token)
    } else {
      return { error: "Login action :: Failed to generate verification token!" }
    }
    return { success: "Login action :: Verification email sent!" }
  }

  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByIdentifier(email)
      if (!twoFactorToken) return { error: "Login action :: Invalid or expired 2FA code!" }
      if (twoFactorToken.token !== code) return { error: "Login action :: Incorrect 2FA code!" }
      if (new Date(twoFactorToken.expires) < new Date()) return { error: "Login action :: Code has expired!" }

      await TwoFactorToken.findByIdAndDelete(twoFactorToken._id)

      const existingConfirmation = await TwoFactorConfirmation.findOne({ userId: existingUser.id })
      if (existingConfirmation) await TwoFactorConfirmation.findByIdAndDelete(existingConfirmation._id)

      await TwoFactorConfirmation.create({ userId: existingUser.id })
    } else {
      const twoFactorToken = await generateTwoFactorToken(email)
      if (twoFactorToken) {
        await sendTwoFactorTokenEmail(twoFactorToken.identifier as string, twoFactorToken.token as string)
      } else {
        return { error: "Failed to generate 2FA token!" }
      }
      return { isTwoFactor: true }
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
    })
    return { success: true, message: "Login successful!" };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.message === "CredentialsSignin") {
        return { error: "Login action :: Invalid credentials catch!" }
      } else {
        return { error: "Login :: Authentication error catch!" }
      }
    }
    throw error
  }
}