"use client";

import { useState, useEffect, useRef } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import { useTheme } from "next-themes";

// Define the snippet type
type Snippet = {
	id: number;
	title: string;
	language: string;
	code: string;
	tags: string[];
	createdAt: string; // or Date, depending on your API response
};

export default function Snippets() {
	const { theme } = useTheme();
	const [searchTerm, setSearchTerm] = useState("");
	const [snippets, setSnippets] = useState<Snippet[]>([]);
	const snippetsRef = useRef<HTMLDivElement>(null); // Reference to the snippets container

	useEffect(() => {
		// Fetch data from the API
		async function fetchSnippets() {
			try {
				const response = await fetch("/api/snippets"); // Adjust URL based on your API
				const data = await response.json();
				setSnippets(data);
			} catch (error) {
				console.error("Error fetching snippets:", error);
			}
		}

		fetchSnippets();
	}, []);

	useEffect(() => {
		Prism.highlightAll(); // Highlight the code when the page loads and when theme changes
	}, [theme]);

	useEffect(() => {
		if (snippetsRef.current) {
			Prism.highlightAll(); // Reapply syntax highlighting after snippets are rendered
		}
	}, [snippets]); // Dependency on snippets to trigger highlighting after fetch

	// Filter snippets based on search term
	const filteredSnippets = snippets.filter(
		(snippet) =>
			snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			snippet.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
			snippet.tags.some((tag) =>
				tag.toLowerCase().includes(searchTerm.toLowerCase())
			)
	);

	return (
			<div className="min-h-screen p-8">
				{/* Search bar */}
				{/* <div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-800 mb-4">
						All Snippets
					</h1>
					<div className="relative">
						<Input
							type="text"
							placeholder="Search snippets..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10"
						/>
						<Search
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={20}
						/>
					</div>
				</div> */}

				<div className="grid grid-cols-1 gap-6" ref={snippetsRef}>
					{filteredSnippets.map((snippet) => (
						<Card
							key={snippet.id}
							className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between duration-300"
						>
							<CardHeader className="border-b border-primary-100">
								<CardTitle className="text-xl font-semibold">
									{snippet.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="p-4">
								<pre className="rounded-md max-h-[300px] overflow-y-auto p-4 overflow-x-auto text-sm">
									<code
										className={`language-${snippet.language}`}
									>
										{snippet.code}
									</code>
								</pre>
							</CardContent>
							<CardFooter className="bg-primary-50 p-4 flex justify-between items-center">
								<Badge
									variant="secondary"
									className="text-xs font-medium"
								>
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
					))}
				</div>
			</div>
	);
}
