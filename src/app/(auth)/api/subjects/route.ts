import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import "@/models";
import SubjectModel from "@/models/Subject.model";

export async function GET() {
 await connectDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection error");
  });

  try {
    const subjects = await SubjectModel.find()
      .populate({
        path: "teachers",
        select: "_id user",
        populate: { path: "user", select: "firstName lastName" },
      })
      .lean();

    return NextResponse.json({ success: true, data: subjects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}