// pages/api/ratings/[snippetId]/route.ts

import dbConnect from "@/lib/db/connect";
import Rating from "@/lib/db/ratingModel";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server"; // Import currentUser from Clerk


export async function GET(
    
	req: Request,
	{ params }: { params: { snippetId: string } }
) {
    await dbConnect();
	const { snippetId } = params;

	try {
        const user = await currentUser();
        const userId = user ? user.id : null
		const ratings = await Rating.find({ snippetId });
        const userRating = userId ? ratings.find(rating => rating.userId === userId) : null;
		if (ratings.length === 0) {
			// Handle the case where no ratings exist for the snippet
			return NextResponse.json({ averageRating: 0, totalRatings: 0 });
		}

		const totalRatings = ratings.length;
		const averageRating =
			ratings.reduce((sum, rating) => sum + rating.rating, 0) /
			totalRatings;

		return NextResponse.json({ averageRating, totalRatings, userRating: userRating ? userRating.rating : null, });
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching ratings" },
			{ status: 500 }
		);
	}
}
