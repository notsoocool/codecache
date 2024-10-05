import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function GET() {
    try {
        const snippets = await db.snippet.findMany();
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
        const { title, language, code, description, tags, category, difficulty, usage } = await req.json();

        const user = await currentUser();
        if (!user) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        const userId = user.id;
        const newSnippet = await db.snippetRequest.create({
            data: {
                title,
                language,
                code,
                description,
                tags,
                category,          // Ensure this is included
                difficulty,        // Ensure this is included
                usage,             // Ensure this is included
                submittedBy: userId,
            }
        })

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

