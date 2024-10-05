import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	try {
		const user = await currentUser();
		if (!user) {
			return NextResponse.json(
				{ error: "User not authenticated" },
				{ status: 401 }
			);
		}

		const userId = user.id;


		// Find the snippet by ID
		const snippet = await db.snippet.findUnique({
			where: { id }
		})

		if (!snippet) {
			return NextResponse.json(
				{ error: "Snippet not found" },
				{ status: 404 }
			);
		}

		// Toggle bookmark
		const isBookmarked = snippet.bookmarkedBy.includes(userId);
		if (isBookmarked) {
			// User is already bookmarked, remove userId
			snippet.bookmarkedBy = snippet.bookmarkedBy.filter(
				(id) => id !== userId
			);
		} else {
			// User is not bookmarked, add userId
			snippet.bookmarkedBy.push(userId);
		}

		// Save snippet with the updated bookmarkedBy array
		const updatedSnippet = await db.snippet.update({
			where: { id },
			data: { bookmarkedBy: snippet.bookmarkedBy }
		})

		return NextResponse.json(updatedSnippet, { status: 200 });
	} catch (error) {
		console.error("Error updating bookmark:", error);
		return NextResponse.json(
			{ error: "Error updating bookmark" },
			{ status: 500 }
		);
	}
}
