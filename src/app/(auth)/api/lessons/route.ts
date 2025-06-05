import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import "@/models";
import LessonModel from "@/models/Lesson.model";

export async function GET() {
 await connectDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection error");
  });

  try {
    const lessons = await LessonModel.find()
      .populate({ path: "class", select: "name _id" })
      .populate({ path: "subject", select: "name _id" })
      .populate({
        path: "teacher",
        select: "_id user",
        populate: { path: "user", select: "firstName lastName" },
      })
      .lean();

    return NextResponse.json({ success: true, data: lessons }, { status: 200 });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}