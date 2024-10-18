import dbConnect from "@/lib/db/connect";
import Snippet from "@/lib/db/snippetModel";
import SnippetRequest from "@/lib/db/snippetRequestModel";
import Notification from "@/lib/db/notificationModel"; // Import Notification model
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
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

    // Create a new Snippet from the request
    const newSnippet = new Snippet({
      title: request.title,
      language: request.language,
      code: request.code,
      description: request.description,
      tags: request.tags,
      userId: request.submittedBy,
      bookmarkedBy: [],
      category: request.category,
      difficulty: request.difficulty,
      usage: request.usage,
    });

    await newSnippet.save();
    await SnippetRequest.findByIdAndDelete(requestId);

    // Create a notification for the user
    await Notification.create({
      userId: request.submittedBy, 
      type: "snippet_request",
      snippetId: newSnippet._id,
      message: `Your snippet request has been accepted. Reason: ${reason}`,
      status: "unread",
    });

    return NextResponse.json(
      { message: "Snippet accepted, notification sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error accepting snippet request" },
      { status: 500 }
    );
  }
}
