import dbConnect from "@/lib/db/connect";
import SnippetRequest from "@/lib/db/snippetRequestModel";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
    console.log("first", id);
  
    try {
      const user = await currentUser();
      const userId = user?.id;
  
      if (!userId) {
        return NextResponse.json(
          { error: "User not authenticated" },
          { status: 401 }
        );
      }
  
      await dbConnect();
  
      const userSnippets = await SnippetRequest.find({ submittedBy: userId });
      console.log('first1', userSnippets);
      
      if (!userSnippets) {
          return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
      }
      
      // Return the bookmarked snippets
      return NextResponse.json(userSnippets, { status: 200 });
  
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      return NextResponse.json(
        { error: "Error fetching bookmarks" },
        { status: 500 }
      );
    }
  }
  