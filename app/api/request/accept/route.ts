// /api/request/accept/route.ts

import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// /api/request/accept/route.ts

export async function PATCH(req: NextRequest) {

	try {
		const { requestId } = await req.json();

		const request = await db.snippetRequest.findUnique({ where: { id: requestId } })
		if (!request)
			return NextResponse.json(
				{ message: "Snippet request not found" },
				{ status: 404 }
			);

		await db.snippet.create({
			data: {
				code: request.code,
				difficulty: request.difficulty,
				description: request.description,
				title: request.title,
				language: request.language,
				category: request.category,
				tags: request.tags,
				usage: request.usage,
			}
		})

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
