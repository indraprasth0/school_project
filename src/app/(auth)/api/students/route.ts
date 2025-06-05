import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import "@/models";
import StudentModel from "@/models/Student.model";

export async function GET() {
 await connectDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection error");
  });

  try {
    const students = await StudentModel.find()
      .populate({ path: "user", select: "_id firstName lastName email phone username address" })
      .populate({ path: "grade", select: "level" })
      .populate({
        path: "class",
        select: "name lessons",
        populate: {
          path: "lessons",
          select: "name teacher",
          populate: { path: "teacher", select: "_id" },
        },
      })
      .lean();

    return NextResponse.json({ success: true, data: students }, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}