import dbConnect from "@/lib/db/connect";
import SnippetRequest from "@/lib/db/snippetRequestModel";
import Notification from "@/lib/db/notificationModel"; // Import Notification model
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const { requestId, reason } = await req.json(); // Capture the reason

    const request = await SnippetRequest.findById(requestId);
    if (!request) {
      return NextResponse.json(
        { message: "Snippet request not found" },
        { status: 404 }
      );
    }

    await SnippetRequest.findByIdAndDelete(requestId);

    // Create a notification for the user
    await Notification.create({
      userId: request.submittedBy,
      type: "snippet_request",
      message: `Your snippet request has been rejected. Reason: ${reason}`,
      status: "unread",
    });

    return NextResponse.json(
      { message: "Snippet request rejected, notification sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error rejecting snippet request" },
      { status: 500 }
    );
  }
}
