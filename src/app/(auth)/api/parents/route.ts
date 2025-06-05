import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import "@/models";
import ParentModel from "@/models/Parent.model";

export async function GET() {
 await connectDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection error");
  });

  try {
    const parents = await ParentModel.find()
      .populate({ path: "user", select: "_id firstName lastName email phone username address" })
      .populate({
        path: "students",
        select: "_id user",
        populate: { path: "user", select: "_id firstName lastName" },
      })
      .lean();

    return NextResponse.json({ success: true, data: parents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching parents:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}