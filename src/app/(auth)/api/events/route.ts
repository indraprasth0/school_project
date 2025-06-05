import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import "@/models";
import EventModel from "@/models/Event.model";

export async function GET() {
 await connectDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection error");
  });

  try {
    const events = await EventModel.find()
      .populate({ path: "class", select: "name" })
      .lean();

  return NextResponse.json({ success: true, data: events }, { status: 200 });

} catch (error: unknown) {
  const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
  console.error("Error fetching exams:", errMessage);
  return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
}
}