"use server";
import bcrypt from "bcryptjs"

import { connectDB } from "@/lib/connectDB";
import User, { IUser } from "@/models/userModel";
import { IActionResponce } from "@/types/auth.user";
import { Types } from "mongoose";

// Get user by ID
export const getUserById = async (
  id: string
): Promise<IUser | null> => {
  connectDB().catch((err) => {
    throw new Error("Cannot connect to DB", err.message);
  });
  try {
    if (!Types.ObjectId.isValid(id)) {
      console.error("Invalid ObjectId:", id);
      return null;
    }
    const objectId = new Types.ObjectId(id);
    const user = await User.findById(objectId);
    // const user: IUser | null = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    console.error("Error getting user by id:", error);
    return null;
  }
};


// Get user by email
export const getUserByEmail: (email: string) => Promise<IUser | null> = async (
  email: string
): Promise<IUser | null> => {
  connectDB().catch((err) => {
    throw new Error("Cannot connect to DB", err.message);
  });
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    // if (!user) return (console.error("Data user :: No user found for email:", email), null);
    // console.log("Data user :: User found for email:", email, user);
    return user;
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
};

export const getUserByEmailWithPassword: (email: string) => Promise<IUser | null> = async (
  email: string
): Promise<IUser | null> => {
  connectDB().catch((err) => {
    throw new Error("Cannot connect to DB", err.message);
  });
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return (console.error("Data user :: No user found for email:", email), null);
    // console.log("Data user :: User found for email:", email, user);
    return user;
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
};

export const getUserByEmailPasswordWithMatch: (email: string, password: string) => Promise<IActionResponce | null> = async (
  email: string,
  password: string
): Promise<IActionResponce | null> => {
  connectDB().catch((err) => {
    throw new Error("Cannot connect to DB", err.message);
  });
  try {
    const user = await User.findOne({ email }).select("+password");
    // if (!user || !user.password) return (console.error("Data user :: Invalid credentials no user or password"), null);
    if (!user || !user.password) return { success: false, message: "Invalid credentials no user or password" };

    const passwordsMatch = await bcrypt.compare(password, user.password);
    // if (!passwordsMatch) return (console.error("Data user :: Invalid credentials no password match"), null);
    if (!passwordsMatch) return { success: false, message: "Invalid credentials" };

    const plainObjectUser: { id: string } = {
      id: user._id.toString(),
    };

    return { success: true, data: plainObjectUser };

  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
};

export const getUserByMatchPassword: (email: string) => Promise<IUser | null> = async (
  email: string
): Promise<IUser | null> => {
  connectDB().catch((err) => {
    throw new Error("Cannot connect to DB", err.message);
  });
  try {
    const user = await User.findOne({ email }).select("+password");
    return user;
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
};