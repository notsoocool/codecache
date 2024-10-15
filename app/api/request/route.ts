import { NextResponse } from "next/server";
import SnippetRequest from "@/lib/db/snippetRequestModel";
import dbConnect from "@/lib/db/connect";
import { auth } from "@clerk/nextjs/server";

// Get all unapproved snippet requests
export async function GET() {
	try {
        const { userId } = auth();

        const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || [];
    
        if (!userId || !adminUserIds.includes(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    
        // Handle your admin logic here
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
