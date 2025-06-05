import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import "@/models";
import ExamModel from "@/models/Exam.model";

export async function GET() {
 await connectDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection error");
  });

  try {
    const exams = await ExamModel.find()
      .populate({
        path: "lesson",        
        select: "name class subject teacher",
        populate: [
          {
            path: "class",            
            select: "name",
          },
          {
            path: "subject",            
            select: "name _id",
          },
          {
            path: "teacher",            
            select: "_id user",
            populate: {
              path: "user",              
              select: "firstName lastName",
            },
          },
        ],
      })
      .lean();

    return NextResponse.json({ success: true, data: exams }, { status: 200 });

  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching exams:", errMessage);
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}