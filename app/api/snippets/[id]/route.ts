import { NextResponse } from "next/server";
import bson from "bson-objectid";
import db from "@/lib/db";

// Handler for GET requests (fetching snippet by ID)
export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {

		const { id } = params; // Extract the snippet ID from the request params

		// Check if the ID is a valid MongoDB ObjectId
		if (!bson.isValid(id)) {
			return NextResponse.json(
				{ error: "Invalid snippet ID" },
				{ status: 400 }
			);
		}

		// Find the snippet by ID in the database
		const snippet = await db.snippet.findUnique({ where: { id } });

		// If snippet not found, return a 404 error
		if (!snippet) {
			return NextResponse.json(
				{ error: "Snippet not found" },
				{ status: 404 }
			);
		}

		// Return the snippet as JSON
		return NextResponse.json(snippet, { status: 200 });
	} catch (error) {
		console.error("Error fetching snippet:", error);
		return NextResponse.json(
			{ error: "Error fetching snippet" },
			{ status: 500 }
		);
	}
}
