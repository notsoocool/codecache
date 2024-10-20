import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import Notification from "@/lib/db/notificationModel";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const { userId } = auth(); // Get the current authenticated user

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch all notifications for the logged-in user
    const notifications = await Notification.find({ userId })
      .sort({
        createdAt: -1, // Sort by most recent
      })
      .select("type message snippetId status createdAt"); // Select only relevant fields

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { message: "Error fetching notifications" },
      { status: 500 }
    );
  }
}
