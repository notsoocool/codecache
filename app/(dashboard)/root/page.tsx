"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Prism from "prismjs";
import { useTheme } from "next-themes";

// Define a snippet type
type SnippetRequest = {
	_id: string;
	title: string;
	language: string;
	code: string;
	description?: string;
	tags?: string[];
	category?: string;
	difficulty?: string;
	usage?: string;
	approved: boolean;
};

export default function AdminPage() {
	const { theme } = useTheme();

	const [authorized, setAuthorized] = useState(false);
	const router = useRouter();
	const [snippetRequests, setSnippetRequests] = useState<SnippetRequest[]>(
		[]
	);

	useEffect(() => {
		// Fetch user ID
		const checkAuthorization = async () => {
			try {
				const response = await fetch("/api/getCurrentUser");
				if (!response.ok) {
					throw new Error("User not authenticated");
				}

				const data = await response.json(); // Convert the response to JSON
				const userId = data.id; // Access the `id` from the response JSON

				// Get admin user IDs from environment variables
				const adminUserIds =
					process.env.ADMIN_USER_IDS?.split(",") || [];

				// Check if the current user's ID is in the list of admin user IDs
				if (adminUserIds.includes(userId)) {
					setAuthorized(true); // Authorized access
				} else {
					router.push("/"); // Redirect non-admins to homepage
				}
			} catch (error) {
				console.error("Authorization check failed:", error);
				router.push("/"); // Redirect in case of error
			}
		};

		checkAuthorization();
	}, [router]);

	// Fetch pending snippet requests (unapproved)
	useEffect(() => {
		async function fetchRequests() {
			try {
				const response = await fetch("/api/request"); // Fetch all pending requests (unapproved snippets)
				const data = await response.json();
				setSnippetRequests(data);
			} catch (error) {
				console.error("Error fetching requests:", error);
				toast.error("Failed to load requests");
			}
		}

		fetchRequests();
	}, []);

	// Approve snippet request
	const handleAccept = async (requestId: string) => {
		try {
			const response = await fetch("/api/request/accept", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ requestId }),
			});

			if (response.ok) {
				setSnippetRequests((prev) =>
					prev.filter((request) => request._id !== requestId)
				);
				toast.success("Snippet accepted and added to the database!");
			} else {
				toast.error("Failed to accept snippet request.");
			}
		} catch (error) {
			console.error(error);
			toast.error("Error accepting snippet request.");
		}
	};

	const handleReject = async (requestId: string) => {
		try {
			const response = await fetch("/api/request/reject", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ requestId }),
			});

			if (response.ok) {
				setSnippetRequests((prev) =>
					prev.filter((request) => request._id !== requestId)
				);
				toast.success("Snippet request rejected and deleted.");
			} else {
				toast.error("Failed to reject snippet request.");
			}
		} catch (error) {
			console.error(error);
			toast.error("Error rejecting snippet request.");
		}
	};

	useEffect(() => {
		Prism.highlightAll(); // Highlight the code when the page loads and when theme changes
	}, [theme]);

	useEffect(() => {
		Prism.highlightAll(); // Reapply syntax highlighting after snippets are rendered
	}, [snippetRequests]);

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-6">Snippet Requests</h1>
			<div className="grid grid-cols-1 gap-6">
				{snippetRequests.map((request) => (
					<Card key={request._id}>
						<CardHeader>
							<CardTitle className="flex justify-between items-center">
								{request.title}
								<div className=" flex gap-6 text-muted-foreground text-xs">
									<p>
										<strong>Category:</strong>{" "}
										{request.category}
									</p>
									<p>
										<strong>Difficulty:</strong>{" "}
										{request.difficulty}
									</p>
									<p>
										<strong>Usage:</strong> {request.usage}
									</p>
								</div>
								<div className="flex gap-4">
									<Button
										onClick={() =>
											handleAccept(request._id)
										}
									>
										Approve
									</Button>
									<Button
										onClick={() =>
											handleReject(request._id)
										}
										variant="destructive"
									>
										Reject
									</Button>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<pre className="rounded-md max-h-[300px] overflow-y-auto p-4 overflow-x-auto text-sm">
								<code
									className={`language-${request.language}`}
								>
									{request.code}
								</code>
							</pre>
						</CardContent>
						<CardFooter className="bg-primary-50 p-4 w-full flex flex-col items-center">
							<div className="w-full flex justify-between">
								<Badge
									variant="secondary"
									className="text-xs font-medium"
								>
									{request.language}
								</Badge>
								<div className="flex gap-2">
									{request.tags &&
										request.tags.map((tag) => (
											<Badge
												key={tag}
												variant="outline"
												className="text-xs"
											>
												{tag}
											</Badge>
										))}
								</div>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
