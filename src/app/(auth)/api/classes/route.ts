import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import "@/models";
import ClassModel from "@/models/Class.model";

export async function GET() {
 await connectDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection error");
  });

  try {
    const classes = await ClassModel.find()
      .populate({ path: "grade", select: "level" })
      .populate({
        path: "lessons",
        select: "name class",
        populate: { path: "class", select: "name _id" },
      })
      .populate({
        path: "supervisor",
        select: "_id user",
        populate: { path: "user", select: "firstName lastName" },
      })
      .lean();

    return NextResponse.json({ success: true, data: classes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}