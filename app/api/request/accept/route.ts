// /api/request/accept/route.ts

import dbConnect from "@/lib/db/connect";
import Snippet from "@/lib/db/snippetModel";
import SnippetRequest from "@/lib/db/snippetRequestModel";
import { NextRequest, NextResponse } from "next/server";

// /api/request/accept/route.ts

export async function PATCH(req: NextRequest) {
	await dbConnect();

	try {
		const { requestId } = await req.json();

		const request = await SnippetRequest.findById(requestId);
		if (!request)
			return NextResponse.json(
				{ message: "Snippet request not found" },
				{ status: 404 }
			);

		// Create a new Snippet from the request
		const newSnippet = new Snippet({
			title: request.title,
			language: request.language,
			code: request.code,
			description: request.description,
			tags: request.tags,
			userId: request.submittedBy,
			bookmarkedBy: [], // Initialize as empty
			category: request.category, // Include category
			difficulty: request.difficulty, // Include difficulty
			usage: request.usage // Include usage

		});

		await newSnippet.save();
		await SnippetRequest.findByIdAndDelete(requestId);

		return NextResponse.json(
			{ message: "Snippet accepted and added to the database" },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error accepting snippet request" },
			{ status: 500 }
		);
	}
}