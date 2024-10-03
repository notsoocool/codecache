	import dbConnect from "@/lib/db/connect";
	import Snippet from "@/lib/db/snippetModel";
	import SnippetRequest from "@/lib/db/snippetRequestModel";
	import { NextRequest, NextResponse } from "next/server";

	export async function PATCH(req: NextRequest) {
		await dbConnect();

		try {

			const { requestId } = await req.json();

			if (!requestId) {
				console.error("No requestId provided");
				return NextResponse.json(
					{ message: "Invalid request ID" },
					{ status: 400 }
				);
			}

			const request = await SnippetRequest.findById(requestId);
			if (!request) {
				console.warn("Snippet request not found for ID:", requestId);
				return NextResponse.json(
					{ message: "Snippet request not found" },
					{ status: 404 }
				);
			}

			console.log("Snippet request found:", request);

			// Create a new Snippet from the request, including all required fields
			const newSnippet = new Snippet({
				title: request.title,
				language: request.language,
				code: request.code,
				description: request.description,
				tags: request.tags,
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
			console.error("Error accepting snippet request:", error);
			return NextResponse.json(
				{ message: "Error accepting snippet request" },
				{ status: 500 }
			);
		}
	}
