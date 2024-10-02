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
        await dbConnect();
        const { title, language, code, description, tags, category, difficulty, usage } = await req.json();
        // console.log("Request body:", { title, language, code, description, tags, category, difficulty, usage }); // Log the incoming data
        // console.log("Database Connection Status:", mongoose.connection.readyState);

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
            category,          // Ensure this is included
            difficulty,        // Ensure this is included
            usage,             // Ensure this is included
            submittedBy: userId,
        });

        await newSnippet.save();

        const newsnippet = new Snippet({
            title,
            language,
            code,
            description,
            tags,
            category,          // Ensure this is included
            difficulty,        // Ensure this is included
            usage,             // Ensure this is included
            // submittedBy: userId,
        });

        await newsnippet.save();

        return NextResponse.json(
            { message: "Snippet submitted for approval" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving snippet request:", error); // Log the error
        return NextResponse.json(
            { message: "Failed to add snippet" },
            { status: 500 }
        );
    }
}

