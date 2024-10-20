import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import DeleteRequest from "@/lib/db/deleteRequestModel";
import Notification from "@/lib/db/notificationModel";
import { auth } from "@clerk/nextjs/server";

// Reject the snippet deletion request
export async function PATCH(req: NextRequest) {
  await dbConnect();

  try {
    const { requestId, reason } = await req.json(); // Get the reason from request body

    const request = await DeleteRequest.findById(requestId);
    if (!request) {
      return NextResponse.json(
        { message: "Snippet request not found" },
        { status: 404 }
      );
    }

    await DeleteRequest.findByIdAndDelete(requestId);

    // Send a notification to the user about the rejection
    await Notification.create({
      userId: request.deletionRequestedBy, // Notify the user who requested the deletion
      type: "deletion_request",
      snippetId: request.snippetId,
      message: `Your request to delete snippet has been rejected. Reason: ${reason}`,
      status: "unread",
    });

    return NextResponse.json(
      { message: "Snippet deletion request rejected and user notified" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error rejecting snippet deletion request" },
      { status: 500 }
    );
  }
}
