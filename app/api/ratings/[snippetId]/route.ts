// pages/api/ratings/[snippetId]/route.ts

import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server"; // Import currentUser from Clerk
import db from "@/lib/db";


export async function GET(
	req: Request,
	{ params }: { params: { snippetId: string } }
) {
	const { snippetId } = params;

	try {
		const user = await currentUser();
		const userId = user ? user.id : null

		const snippet = await db.snippet.findUnique({ where: { id: snippetId }, include: { ratings: true } })

		if (!snippet) {
			return NextResponse.json({ error: "Snippet not found with id" }, { status: 400 });
		}

		const ratings = snippet.ratings;

		const userRating = userId ? ratings.find(rating => rating.userId === userId) : null;
		if (ratings.length === 0) {
			// Handle the case where no ratings exist for the snippet
			return NextResponse.json({ averageRating: 0, totalRatings: 0 });
		}

		const totalRatings = ratings.length;
		const averageRating = snippet.averageRating;

		return NextResponse.json({ averageRating, totalRatings, userRating: userRating ? userRating.rating : null, });
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching ratings" },
			{ status: 500 }
		);
	}
}
