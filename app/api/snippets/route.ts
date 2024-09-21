// api/snipets/route.ts

import { NextResponse } from "next/server";
import Snippet from "@/lib/db/snippetModel";
import SnippetRequest from "@/lib/db/snippetRequestModel";
import dbConnect from "@/lib/db/connect";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
	try {
		await dbConnect();
		const snippets = await Snippet.find({});
		console.log("Fetched Snippets"); // Add debug log
		return NextResponse.json(snippets);
	} catch (error) {
		console.error("Error fetching snippets:", error); // Add debug log
		return NextResponse.json(
			{ error: "Error fetching snippets" },
			{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	try {
		const { title, language, code, description, tags } = await req.json();
		const user = await currentUser();
		const userId = user?.id;

		if (!userId) {
			return NextResponse.json(
				{ error: "User not authenticated" },
				{ status: 401 }
			);
		}
		const newSnippet = new SnippetRequest({
			title,
			language,
			code,
			description,
			tags,
            createdAt: new Date(),
			submittedBy: userId, // Initially not approved
		});
		await newSnippet.save();
		return NextResponse.json(
			{ message: "Snippet submitted for approval" },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to add snippet" },
			{ status: 500 }
		);
	}
}
