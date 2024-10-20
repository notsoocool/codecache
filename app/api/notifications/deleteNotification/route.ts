import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import Notification from "@/lib/db/notificationModel";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { notificationId } = await req.json();

    const notification = await Notification.findById(notificationId);
    if (!notification || notification.userId !== userId) {
      return NextResponse.json({ message: "Notification not found" }, { status: 404 });
    }

    // Delete the notification
    await Notification.findByIdAndDelete(notificationId);

    return NextResponse.json({ message: "Notification deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json({ message: "Error deleting notification" }, { status: 500 });
  }
}
