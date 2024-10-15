// /api/request/reject/route.ts

import dbConnect from "@/lib/db/connect";
import SnippetRequest from "@/lib/db/snippetRequestModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
	await dbConnect();

	try {
		const { requestId } = await req.json();

		const request = await SnippetRequest.findByIdAndDelete(requestId);
		if (!request)
			return NextResponse.json(
				{ message: "Snippet request not found" },
				{ status: 404 }
			);

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
