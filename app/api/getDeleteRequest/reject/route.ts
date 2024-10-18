import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import { auth } from "@clerk/nextjs/server";
import DeleteRequest from "@/lib/db/deleteRequestModel";

// Get all unapproved snippet requests
export async function PATCH(req: NextRequest) {
  try {
    const { userId } = auth();

    const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || [];

    if (!userId || !adminUserIds.includes(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Handle your admin logic here
    await dbConnect();
    const { requestId } = await req.json();

    const pendingDeleteRequests = await DeleteRequest.findById(requestId);
    if (!pendingDeleteRequests)
      return NextResponse.json(
        { message: "Snippet request not found" },
        { status: 404 },
      );

    console.log("Fetched Pending DeleteRequest");
    await DeleteRequest.findByIdAndDelete(requestId);

    return NextResponse.json({ message: "Request Rejected" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching pending DeleteRequest:", error);
    return NextResponse.json(
      { error: "Error fetching pending DeleteRequest" },
      { status: 500 },
    );
  }
}
