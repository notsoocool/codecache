import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db/connect";
import Snippet from "@/lib/db/snippetModel";
import Rating from "@/lib/db/ratingModel";
import SnippetRequest from "@/lib/db/snippetRequestModel";

// score points constants
const SNIPPET_POINTS = 5;
const RATING_POINTS = 3;
const BOOKMARK_POINTS = 2;

export async function GET(req: NextRequest, { params: { userId } }: { params: { userId: string } }) {
  try {
    // Check if userId exists
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Ensure user is authenticated
    const user = await currentUser();
    const authenticatedUserId = user?.id;

    if (!authenticatedUserId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Fetch data
    const bookmarked = await Snippet.find({ bookmarkedBy: authenticatedUserId });
    const snippets = await SnippetRequest.find({ submittedBy: authenticatedUserId });
    const ratings = await Rating.find({ userId: authenticatedUserId }).populate('snippetId');

    // Calculate total points
    const totalSnippetsPoints = snippets.length * SNIPPET_POINTS;
    const totalBookmarkedPoints = bookmarked.length * BOOKMARK_POINTS;
    const totalRatingsPoints = ratings.length * RATING_POINTS;

    // Calculate total contribution
    const contribution = totalBookmarkedPoints + totalRatingsPoints + totalSnippetsPoints;

    // Return the user's profile data
    return NextResponse.json({
      bookmarked,
      ratings,
      snippets,
      contribution,
      totalSnippetsPoints,
      totalBookmarkedPoints,
      totalRatingsPoints
    });
  } catch (error) {
    console.error("Error fetching profile data:");
    return NextResponse.json(
      { error: "Error fetching profile" },
      { status: 500 }
    );
  }
}
