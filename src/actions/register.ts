"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import {connectDB} from "@/lib/connectDB";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import  User  from "@/models/userModel";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";


export const register = async (values: z.infer<typeof RegisterSchema>): Promise<{ success?: string; error?: string }> => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashPassword = await bcrypt.hash(password, 10);

    try {        
         
        await connectDB().catch((error) => {
            console.error("Failed to connect to the database:", error);
            throw new Error("Database connection error");
        }); 

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return { error: "Email already in use!" };
        }

        const newUser = new User({
            email,
            username: `${email}_${name}`,
            name,
            password: hashPassword,
            role: "user",
        })

        const saveUser = await newUser.save();
        if (!saveUser) {
            return { error: "Failed to create user!" };
        }

        console.log("User created successfully:", saveUser);
        

        const verificationToken = await generateVerificationToken(email);

        if (verificationToken) {
            await sendVerificationEmail(verificationToken.identifier, verificationToken.token);
        } else {
            return { error: "Failed to generate verification token." };
        }

        return { success: "Confirmation email sent!" };

    } catch (error) {
        console.log("Error during user registration:", error);
        return { error: "An unexpected error occurred. Please try again." };
    }
};
