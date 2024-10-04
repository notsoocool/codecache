// pages/api/ratings/route.ts

import Rating from "@/lib/db/ratingModel";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db/connect";
import db from "@/lib/db";

export async function POST(req: Request) {
	try {
		const { snippetId, rating } = await req.json(); // Extracting data from the request body
		const user = await currentUser(); // Get the current user from Clerk

		if (!user) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		// Check if the user has already rated this snippet
		const existingRating = await db.rating.findFirst({
			where: { userId: user.id, snippetId }
		})

		if (existingRating) {
			// Update the existing rating
			await db.rating.update({
				where: { id: existingRating.id },
				data: { rating }
			})
		} else {
			// Create a new rating entry
			await db.rating.create({
				data: {
					snippetId,
					userId: user.id,
					rating
				}
			})
		}

		// Recalculate the average rating for the snippet
		const ratings = await db.rating.findMany({ where: { snippetId } });
		const totalRatings = ratings.length;
		const averageRating =
			ratings.reduce((sum, rating) => sum + rating.rating, 0) /
			totalRatings;

		// Updating average rating in snippet
		await db.snippet.update({ where: { id: snippetId }, data: { averageRating } });


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
