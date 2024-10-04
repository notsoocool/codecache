// /api/request/accept/route.ts

import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// /api/request/accept/route.ts

export async function PATCH(req: NextRequest) {

	try {
		const { requestId } = await req.json();

		const request = await db.snippet.findUnique({ where: { id: requestId } })
		if (!request)
			return NextResponse.json(
				{ message: "Snippet request not found" },
				{ status: 404 }
			);

		await db.snippet.update({ where: { id: request.id }, data: { status: 'APPROVED' } })

		return NextResponse.json(
			{ message: "Snippet accepted and approved" },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error accepting snippet request" },
			{ status: 500 }
		);
	}
}
