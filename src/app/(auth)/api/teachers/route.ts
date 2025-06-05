import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import "@/models";
import Teacher from "@/models/Teacher.model";

export async function GET() {
 await connectDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection error");
  });

  try {
    const teachers = await Teacher.find()      
      .populate({ path: "user", select: "_id firstName lastName email phone username address" })
      .populate("subjects", "name")
      .populate("classes", "name")
      .populate({
        path: "lessons",
        select: "name class",
        populate: {
          path: "class",
          model: "classes",
          select: "name _id"
        }
      })
      .lean();

    return NextResponse.json(
      { success: true, data: teachers },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching teachers:", JSON.stringify(error, null, 2));

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}