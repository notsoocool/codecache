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
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

// Define the snippet type
type Snippet = {
	_id: string;
	title: string;
	language: string;
	code: string;
	tags: string[];
};

export default function SnippetPage() {
    const { theme } = useTheme();

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
	useEffect(() => {
		Prism.highlightAll(); // Highlight the code when the page loads and when theme changes
	}, [theme]);

	useEffect(() => {
		Prism.highlightAll(); // Reapply syntax highlighting after snippets are rendered
	}, [snippet]); // Dependency on snippets to trigger highlighting after fetch

	if (loading) {
		return (
			<div className="max-w-screen-2xl mx-auto w-full p-8">
				<Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between duration-300">
					<CardHeader className="border-b border-primary-100">
						<Skeleton className="h-6 w-40" />
					</CardHeader>
					<CardContent>
						<div className="h-[300px] w-full flex items-center justify-center">
							<Loader2 className="size-6 text-slate-300 animate-spin" />
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (!snippet) {
		return (
			<div className="max-w-screen-2xl mx-auto w-full">
				<Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between duration-300">
					<CardHeader className="border-b border-primary-100">
						<CardTitle>Snippet not found</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-[300px] w-full flex items-center justify-center">
							<p className="text-lg text-slate-300">
								<ExclamationTriangleIcon className="w-6 h-6 mr-2" />
								The snippet you are looking for does not exist.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="p-8">
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
