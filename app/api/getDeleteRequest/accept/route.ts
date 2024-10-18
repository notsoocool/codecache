// /api/request/accept/route.ts

import dbConnect from "@/lib/db/connect";
import DeleteRequest from "@/lib/db/deleteRequestModel";
import Snippet from "@/lib/db/snippetModel";
import { NextRequest, NextResponse } from "next/server";

// /api/request/accept/route.ts

export async function PATCH(req: NextRequest) {
  await dbConnect();

  try {
    const { requestId } = await req.json();

    const request = await DeleteRequest.findById(requestId);
    if (!request)
      return NextResponse.json(
        { message: "Snippet request not found" },
        { status: 404 },
      );

    await DeleteRequest.findByIdAndDelete(requestId);
    const snippetId = request.snippetId;
    await Snippet.findByIdAndDelete(snippetId);

    return NextResponse.json(
      { message: "Snippet deleted from the database" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error accepting snippet request" },
      { status: 500 },
    );
  }
}
