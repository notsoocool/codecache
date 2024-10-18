import dbConnect from "@/lib/db/connect";
import DeleteRequest from "@/lib/db/deleteRequestModel";
import Snippet from "@/lib/db/snippetModel";
import Notification from "@/lib/db/notificationModel";
import { NextRequest, NextResponse } from "next/server";

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

    const snippetId = request.snippetId;
    await Snippet.findByIdAndDelete(snippetId);
    await DeleteRequest.findByIdAndDelete(requestId);

    // Send a notification to the user about the acceptance
    await Notification.create({
      userId: request.deletionRequestedBy, // Notify the user who requested the deletion
      type: "deletion_request",
      snippetId: snippetId,
      message: `Your request to delete snippet has been accepted. Reason: ${reason}`,
      status: "unread",
    });

    return NextResponse.json(
      { message: "Snippet deleted from the database and user notified" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error accepting snippet request" },
      { status: 500 }
    );
  }
}
