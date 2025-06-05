"use server"

import * as z from "zod";

import {connectDB} from "@/lib/connectDB";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

interface ResetResponse {
    success?: string;
    error?: string;
}

export const reset = async (values: z.infer<typeof ResetSchema>): Promise<ResetResponse> => {
    try {
        const validatedFields = ResetSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid email!" };
        }

        const { email } = validatedFields.data;

        await connectDB().catch((error) => {
            console.error("Failed to connect to the database:", error);
            throw new Error("Database connection error");
        });

        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
            return { error: "Email does not exist!" };
        }

        const passwordResetToken = await generatePasswordResetToken(email);

        if (passwordResetToken) {
            await sendPasswordResetEmail(passwordResetToken.identifier, passwordResetToken.token);
            return { success: "Reset email sent!" };
        } else {
            return { error: "Failed to generate password reset token." };
        }

    } catch (error) {
        console.error("Error during password reset:", error);
        return { error: "An unexpected error occurred. Please try again." };
    }
};
