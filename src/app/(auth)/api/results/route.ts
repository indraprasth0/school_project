import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import "@/models";
import ResultModel from "@/models/Result.model";

export async function GET() {
 await connectDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection error");
  });

  try {
        // Fetch results with both exam and assignment populated
    const data = await ResultModel.find()
      .populate({
        path: "student",
        select: "_id user",
        populate: { path: "user", select: "firstName lastName" },        
      })
      .populate({
        path: "exam",
        select: "title startTime lesson",
        populate: {
          path: "lesson",
          select: "name class subject teacher",
          populate: [
            { path: "class", select: "name" },
            { path: "subject", select: "name" },
            {
              path: "teacher",
              select: "_id user",
              populate: {
                path: "user",
                select: "firstName lastName",
              },
            },
          ],
        },
      })
      .populate({
        path: "assignment",
        select: "title startDate lesson",
        populate: {
          path: "lesson",
          select: "name class subject teacher",
          populate: [
            { path: "class", select: "name" },
            { path: "subject", select: "name" },
            {
              path: "teacher",
              select: "user",
              populate: {
                path: "user",
                select: "firstName lastName",
              },
            },
          ],
        },
      })    
      .lean();      

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );

  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching results:", errMessage);
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}