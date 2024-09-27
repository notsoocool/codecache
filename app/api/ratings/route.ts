// pages/api/ratings/route.ts

import Rating from "@/lib/db/ratingModel";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db/connect";

export async function POST(req: Request) {
	try {
        await dbConnect();
		const { snippetId, rating } = await req.json(); // Extracting data from the request body
		const user = await currentUser(); // Get the current user from Clerk

		if (!user) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		// Check if the user has already rated this snippet
		const existingRating = await Rating.findOne({
			snippetId,
			userId: user.id,
		});

		if (existingRating) {
			// Update the existing rating
			existingRating.rating = rating;
			await existingRating.save();
		} else {
			// Create a new rating entry
			await Rating.create({ snippetId, userId: user.id, rating });
		}

		// Recalculate the average rating for the snippet
		const ratings = await Rating.find({ snippetId });
		const totalRatings = ratings.length;
		const averageRating =
			ratings.reduce((sum, rating) => sum + rating.rating, 0) /
			totalRatings;

		return NextResponse.json({
			message: "Rating submitted successfully",
			averageRating,
            totalRatings,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Error submitting rating" },
			{ status: 500 }
		);
	}
}
