// /api/request/reject/route.ts

import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {

	try {
		const { requestId } = await req.json();

		const request = await db.snippet.findUnique({ where: { id: requestId } })

		if (!request)
			return NextResponse.json(
				{ message: "Snippet request not found" },
				{ status: 404 }
			);

		await db.snippet.update({ where: { id: request.id }, data: { status: 'REJECTED' } })

		return NextResponse.json(
			{ message: "Snippet request rejected and deleted" },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error rejecting snippet request" },
			{ status: 500 }
		);
	}
}
