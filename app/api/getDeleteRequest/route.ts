import dbConnect from "@/lib/db/connect";
import { NextResponse } from "next/server";
import DeleteRequest from "@/lib/db/deleteRequestModel";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = auth();

    const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || [];

    if (!userId || !adminUserIds.includes(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Handle your admin logic here
    await dbConnect();
    const pendingSnippets = await DeleteRequest.find();
    console.log("Fetched Pending Snippets delete Requests");
    return NextResponse.json(pendingSnippets);
  } catch (error) {
    console.error("Error fetching pending snippets delete Requests:", error);
    return NextResponse.json(
      { error: "Error fetching pending snippets delete Requests" },
      { status: 500 },
    );
  }
}
