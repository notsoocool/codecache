import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{ error: "User not authenticated" },
			{ status: 401 }
		);
	}
    const full_name = user.firstName + " " + user.lastName;
	return NextResponse.json({ id: user.id, email: user.emailAddresses[0].emailAddress, name: full_name, image: user.imageUrl, createdAt: user.createdAt });
}
