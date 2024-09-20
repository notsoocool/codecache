"use client";

import { useState, useEffect } from "react";

export default function Page() {
	const [snippet, setSnippet] = useState<any>(null); // State to store the specific snippet
	const [loading, setLoading] = useState(true); // State to handle loading state
	const snippetId = "66ed3273453c5bf9e6126e67"; // The specific snippet ID you want to fetch

	useEffect(() => {
		// Fetch the specific snippet by ID from the API
		const fetchSnippet = async () => {
			try {
				const response = await fetch(`/api/snippets/${snippetId}`); // Adjust the URL to fetch the snippet by ID
				const data = await response.json();
				setSnippet(data); // Set the fetched snippet in the state
				setLoading(false); // Stop loading once the data is fetched
			} catch (error) {
				console.error("Error fetching snippet:", error);
				setLoading(false); // Stop loading in case of an error
			}
		};

		fetchSnippet();
	}, [snippetId]); // Dependency array to run the effect whenever the snippetId changes

	// Display loading state
	if (loading) {
		return <div>Loading snippet...</div>;
	}

	// If no snippet is found or an error occurs
	if (!snippet) {
		return <div>Snippet not found</div>;
	}

	return (
		<div>
			<h1>Snippet Details</h1>
			<div className="mb-4 p-4 border border-gray-200">
				<h2>{snippet.title}</h2>
				<p>
					<strong>Language:</strong> {snippet.language}
				</p>
				<p>
					<strong>Description:</strong>{" "}
					{snippet.description || "No description"}
				</p>
				<p>
					<strong>Tags:</strong>{" "}
					{snippet.tags?.join(", ") || "No tags"}
				</p>
				<pre>
					<code>{snippet.code}</code>
				</pre>
				<p>
					<strong>Snippet ID:</strong> {snippet._id}
				</p>
			</div>
		</div>
	);
}
