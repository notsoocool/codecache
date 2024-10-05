import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";

// Get all unapproved snippet requests
export async function GET() {
	try {
		const { userId } = auth();

		const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || [];

		if (!userId || !adminUserIds.includes(userId)) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const pendingSnippets = await db.snippetRequest.findMany();

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
