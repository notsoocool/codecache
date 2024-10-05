import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import Snippet from "@/lib/db/snippetModel";
import Comment from "@/lib/db/commentModel";
import { currentUser } from "@clerk/nextjs/server";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { snippetId, content } = await req.json();

    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    const newComment = new Comment({
      snippetId,
      userId,
      content,
    });
    await newComment.save();

    snippet.comments = snippet.comments || [];
    snippet.comments.push(newComment._id as Types.ObjectId);
    await snippet.save();

    return NextResponse.json(
      { message: "Comment added successfully", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const snippetId = url.searchParams.get("snippetId");

    if (!snippetId) {
      return NextResponse.json(
        { error: "Snippet ID is required" },
        { status: 400 }
      );
    }

    const comments = await Comment.find({ snippetId }).sort({ createdAt: -1 });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
