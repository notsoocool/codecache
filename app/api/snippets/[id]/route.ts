import { NextResponse } from "next/server";
import Snippet from "@/lib/db/snippetModel";
import dbConnect from "@/lib/db/connect";
import { ObjectId } from "mongodb";
import DeleteRequest from "@/lib/db/deleteRequestModel";

// Handler for GET requests (fetching snippet by ID)
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // Connect to the database
    await dbConnect();

    const { id } = params; // Extract the snippet ID from the request params

    // Check if the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid snippet ID" },
        { status: 400 },
      );
    }

    // Find the snippet by ID in the database
    const snippet = await Snippet.findById(id);

    // If snippet not found, return a 404 error
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    // Return the snippet as JSON
    return NextResponse.json(snippet, { status: 200 });
  } catch (error) {
    console.error("Error fetching snippet:", error);
    return NextResponse.json(
      { error: "Error fetching snippet" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // Connect to the database
    await dbConnect();

    const { id } = params; // Extract the snippet ID from the request params
    const { userId, snippetId, reason, userName } = await req.json(); // Expecting userId and reason in the request body

    // Check if the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid snippet ID" },
        { status: 400 },
      );
    }

    // const snippet = await Snippet.findById(id);

    // if (!snippet) {
    // 	return NextResponse.json(
    // 		{ error: "Snippet not found" },
    // 		{ status: 404 }
    // 	);
    // }

    // Create a delete request entry
    const deleteRequest = new DeleteRequest({
      snippetId: snippetId,
      deletionRequestedBy: userId, // User ID of the person submitting the request
      reason: reason, // Reason for deletion
      name: userName,
    });

    // Save the delete request to the database
    await deleteRequest.save();

    // Return a success message
    return NextResponse.json(
      { message: "Deletion request submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error submitting deletion request:", error);
    return NextResponse.json(
      { error: "Error submitting deletion request" },
      { status: 500 },
    );
  }
}
