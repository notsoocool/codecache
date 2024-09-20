import { NextResponse } from "next/server";
import Snippet from "@/lib/db/snippetModel";
import dbConnect from "@/lib/db/connect";

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
		await dbConnect();

		const newSnippet = new Snippet({
			title,
			language,
			code,
			description,
			tags,
		});
		await newSnippet.save();

		return NextResponse.json(newSnippet, { status: 201 });
	} catch (error) {
		console.error("Error creating snippet:", error); // Add debug log
		return NextResponse.json(
			{ error: "Error creating snippet" },
			{ status: 500 }
		);
	}
}
