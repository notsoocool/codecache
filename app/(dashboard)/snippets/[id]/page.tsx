"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Prism from "prismjs";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

// Define the snippet type
type Snippet = {
	_id: string;
	title: string;
	language: string;
	code: string;
	tags: string[];
};

export default function SnippetPage() {
	const { id } = useParams(); // Get the snippet ID from the URL
	const [snippet, setSnippet] = useState<Snippet | null>(null);
	const [loading, setLoading] = useState(true);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		// Fetch the snippet by ID
		async function fetchSnippet() {
			try {
				const response = await fetch(`/api/snippets/${id}`);
				const data = await response.json();
				setSnippet(data);
				setLoading(false);
				Prism.highlightAll(); // Reapply syntax highlighting when data is fetched
			} catch (error) {
				console.error("Error fetching snippet:", error);
				setLoading(false);
			}
		}

		if (id) {
			fetchSnippet();
		}
	}, [id]);

	// Copy code to clipboard
	const handleCopy = (code: string) => {
		navigator.clipboard.writeText(code).then(() => {
			setCopied(true);
			toast("Code copied to clipboard");
			setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
		});
	};

	if (loading) {
		return <div>Loading snippet...</div>;
	}

	if (!snippet) {
		return <div>Snippet not found</div>;
	}

	return (
		<div className="min-h-screen p-8">
			<Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between duration-300">
				<CardHeader className="border-b border-primary-100">
					<CardTitle>{snippet.title}</CardTitle>
				</CardHeader>
				<CardContent className="p-4 relative">
					<pre className="rounded-md max-h-[300px] overflow-y-auto p-4 overflow-x-auto text-sm">
						<code className={`language-${snippet.language}`}>
							{snippet.code}
						</code>
					</pre>
					{/* Copy code button */}
					<Button
						variant="outline"
						className="absolute top-8 right-6"
						onClick={() => handleCopy(snippet.code)}
					>
						<Copy size={16} />
					</Button>
				</CardContent>
				<CardFooter className="bg-primary-50 p-4 flex justify-between items-center">
					<Badge variant="secondary" className="text-xs font-medium">
						{snippet.language}
					</Badge>
					<div className="flex gap-2">
						{snippet.tags.map((tag) => (
							<Badge
								key={tag}
								variant="outline"
								className="text-xs"
							>
								{tag}
							</Badge>
						))}
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
