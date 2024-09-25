"use client";

import Prism from "prismjs";
import Link from "next/link";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, BookmarkCheck, Copy, Loader2, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-go";

// Define the snippet type
type Snippet = {
	_id: any;
	title: string;
	language: string;
	code: string;
	tags: string[];
	createdAt: string;
	bookmarkedBy: string[];
};

export default function Snippets() {
	const { theme } = useTheme();
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true); // Loading state
	const [snippets, setSnippets] = useState<Snippet[]>([]);
	const [copied, setCopied] = useState<number | null>(null); // For copy feedback
	const snippetsRef = useRef<HTMLDivElement>(null); // Reference to the snippets container
	const [activeSnippetId, setActiveSnippetId] = useState<string | null>(null); // To track active snippet
	const [userId, setUserId] = useState<string | null>(null);

	// Refs for each snippet card to track visibility
	const snippetRefs = useRef<{ [key: string]: HTMLElement | null }>({});

	useEffect(() => {
		// Fetch data from the API
		async function fetchSnippets() {
			try {
				setLoading(true); // Start loading
				const response = await fetch("/api/snippets"); // Adjust URL based on your API
				const data = await response.json();
				setSnippets(data);
			} catch (error) {
				console.error("Error fetching snippets:", error);
			} finally {
				setLoading(false); // Stop loading
			}
		}

		fetchSnippets();
	}, []);

	useEffect(() => {
		Prism.highlightAll(); // Highlight the code when the page loads and when theme changes
	}, [theme]);

	useEffect(() => {
		Prism.highlightAll(); // Reapply syntax highlighting after snippets are rendered
	}, [snippets]); // Dependency on snippets to trigger highlighting after fetch

	const handleBookmarkToggle = async (snippetId: string) => {
		try {
			const response = await fetch(`/api/bookmark/${snippetId}`, {
				method: "PATCH",
			});

			if (!response.ok) {
				throw new Error("Failed to toggle bookmark");
			}

			const updatedSnippet = await response.json();
			// Update your state or UI accordingly
			setSnippets(
				snippets.map((snippet) =>
					snippet._id === updatedSnippet._id
						? updatedSnippet
						: snippet
				)
			);

			// Show success toast message
			if (updatedSnippet.bookmarkedBy.includes(userId)) {
				toast.success("Snippet bookmarked");
			} else {
				toast.success("Bookmark removed");
			}
		} catch (error) {
			console.error(error);
			toast.error("Error toggling bookmark");
		}
	};

	const handleCopy = (code: string, id: number) => {
		navigator.clipboard.writeText(code).then(() => {
			setCopied(id); // Set the ID of the copied snippet
			toast("Code copied to clipboard");
			setTimeout(() => setCopied(null), 2000); // Reset after 2 seconds
		});
	};

	// Scroll event to observe which snippet is visible
	const handleScroll = useCallback(() => {
		Object.keys(snippetRefs.current).forEach((snippetId) => {
			const ref = snippetRefs.current[snippetId];
			if (
				ref &&
				ref.getBoundingClientRect().top < window.innerHeight / 2
			) {
				setActiveSnippetId(snippetId);
			}
		});
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	const filteredSnippets = snippets.filter(
		(snippet) =>
			snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			snippet.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
			snippet.tags.some((tag) =>
				tag.toLowerCase().includes(searchTerm.toLowerCase())
			)
	);

	return (
		<div className="flex min-h-screen">
			<div className="sticky w-4/12  -ml-5  top-24 overflow-auto h-[85vh]">
				{loading ? (
					<div className="flex items-start flex-col gap-3">
						<Skeleton className=" mt-2 h-6 w-48" />
						<Skeleton className=" mt-2 h-6 w-48 delay-150" />
						<Skeleton className=" mt-2 h-6 w-48 delay-300" />
					</div>
				) : (
					<div className="flex items-start flex-col gap-2">
						{filteredSnippets.map((snippet) => (
							<Button
								key={snippet._id}
								variant={
									snippet._id === activeSnippetId
										? "secondary"
										: "ghost"
								}
								onClick={() =>
									document
										.getElementById(snippet._id)
										?.scrollIntoView({ behavior: "smooth" })
								}
							>
								<span className=" text-xs font-medium">
									{snippet.title}
								</span>
							</Button>
						))}
					</div>
				)}
			</div>

			{/* Main content */}
			<div className="p-8 w-full">
				{loading ? (
					<div className="max-w-screen-2xl mx-auto w-full">
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
				) : (
					<div className="grid grid-cols-1 gap-6" ref={snippetsRef}>
						{filteredSnippets.map((snippet) => (
							<Link
								href={`/snippets/${snippet._id}`}
								key={snippet._id}
							>
								<Card
									id={snippet._id}
									ref={(el) => {
										snippetRefs.current[snippet._id] = el;
									}}
									className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between duration-300"
								>
									<CardHeader className="border-b border-primary-100">
										<CardTitle>{snippet.title}</CardTitle>
									</CardHeader>
									<CardContent className="p-4 relative">
										<pre className="rounded-md max-h-[300px] overflow-y-auto p-4 overflow-x-auto text-sm">
											<code
												className={`language-${snippet.language}`}
											>
												{snippet.code}
											</code>
										</pre>
										<Button
											variant="outline"
											className="absolute top-8 right-6"
											onClick={() =>
												handleCopy(
													snippet.code,
													snippet._id
												)
											}
										>
											<Copy size={16} />
										</Button>
										<Button
											className="absolute top-8 right-20"
											variant="outline"
											onClick={(e) => {
												e.preventDefault();
												if (snippet._id) {
													handleBookmarkToggle(
														snippet._id
													);
												} else {
													console.error(
														"Snippet ID is null"
													);
												}
											}}
										>
											{userId &&
											snippet.bookmarkedBy?.includes(
												userId
											) ? (
												<BookmarkCheck size={16} />
											) : (
												<Bookmark size={16} />
											)}
										</Button>
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
													key={`${snippet._id}-${tag}`}
													variant="outline"
													className="text-xs"
												>
													{tag}
												</Badge>
											))}
										</div>
									</CardFooter>
								</Card>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
