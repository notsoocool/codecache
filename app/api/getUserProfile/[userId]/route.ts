import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db/connect";
import Snippet from "@/lib/db/snippetModel";
import Rating from "@/lib/db/ratingModel";

// score points constants
const SNIPPET_POINTS = 5;
const RATING_POINTS = 3;
const BOOKMARK_POINTS = 2;

export async function GET(req: NextRequest, { params: { userId } }: { params: { userId: string } }) {

  try {
    await dbConnect();



    const bookmarked = await Snippet.find({
      bookmarkedBy: userId
    });

    const snippets = await Snippet.find({
      userId: userId
    });

    const ratings = await Rating.find({
      userId: userId
    }).populate('snippetId');;

    const totalSnippetsPoints = snippets.length * SNIPPET_POINTS;
    const totalBookmarkedPoints = bookmarked.length * BOOKMARK_POINTS;
    const totalRatingsPoints = ratings.length * RATING_POINTS;


    const contribution = totalBookmarkedPoints + totalRatingsPoints + totalSnippetsPoints;

    return NextResponse.json({ bookmarked, ratings, snippets, contribution, totalSnippetsPoints, totalBookmarkedPoints, totalRatingsPoints });
  } catch (error) {
    console.error("Error fetching profile:", error); // Add debug log
    return NextResponse.json(
      { error: "Error fetching profile" },
      { status: 500 }
    );
  }
}
