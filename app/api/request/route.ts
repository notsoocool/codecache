import { NextResponse } from "next/server";
import SnippetRequest from "@/lib/db/snippetRequestModel";
import dbConnect from "@/lib/db/connect";

// Get all unapproved snippet requests
export async function GET() {
	try {
		await dbConnect();
		const pendingSnippets = await SnippetRequest.find();
		console.log("Fetched Pending Snippets");
		return NextResponse.json(pendingSnippets);
	} catch (error) {
		console.error("Error fetching pending snippets:", error);
		return NextResponse.json(
			{ error: "Error fetching pending snippets" },
			{ status: 500 }
		);
	}
}
