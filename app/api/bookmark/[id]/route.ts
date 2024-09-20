import { NextResponse } from "next/server";
import Snippet from "@/lib/db/snippetModel";
import dbConnect from "@/lib/db/connect";
import { currentUser } from "@clerk/nextjs/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    await dbConnect();

    // Find the snippet by ID
    const snippet = await Snippet.findById(id);

    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    // Toggle bookmark
    if (snippet.bookmarkedBy.includes(userId)) {
      // User is already bookmarked, remove userId
      snippet.bookmarkedBy = snippet.bookmarkedBy.filter(id => id !== userId);
    } else {
      // User is not bookmarked, add userId
      snippet.bookmarkedBy.push(userId);
    }

    await snippet.save();

    return NextResponse.json(snippet, { status: 200 });
  } catch (error) {
    console.error("Error updating bookmark:", error);
    return NextResponse.json({ error: "Error updating bookmark" }, { status: 500 });
  }
}
