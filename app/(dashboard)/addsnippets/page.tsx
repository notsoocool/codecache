"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function AddSnippet() {
	const [title, setTitle] = useState("");
	const [language, setLanguage] = useState("");
	const [code, setCode] = useState("");
	const [description, setDescription] = useState("");
	const [tags, setTags] = useState("");
	const [message, setMessage] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Prepare tags as an array
		const tagsArray = tags.split(",").map(tag => tag.trim());

		try {
			const response = await fetch("/api/snippets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
					language,
					code,
					description,
					tags: tagsArray,
				}),
			});
			if (response.ok) {
				setMessage("Snippet added successfully!");
				router.push("/");
			} else {
				setMessage("Failed to add snippet. Please try again.");
			}
		} catch (error) {
			setMessage("An error occurred. Please try again.");
		}
	};

	return (
		<div className="p-8">
			<h1 className="text-4xl font-bold mb-6">Add New Snippet</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="title" className="block text-sm font-medium text-gray-700">
						Title
					</label>
					<Input
						id="title"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="mt-1"
					/>
				</div>
				<div>
					<label htmlFor="language" className="block text-sm font-medium text-gray-700">
						Language
					</label>
					<Input
						id="language"
						type="text"
						value={language}
						onChange={(e) => setLanguage(e.target.value)}
						className="mt-1"
					/>
				</div>
				<div>
					<label htmlFor="code" className="block text-sm font-medium text-gray-700">
						Code
					</label>
					<Textarea
						id="code"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						className="mt-1"
					/>
				</div>
				<div>
					<label htmlFor="description" className="block text-sm font-medium text-gray-700">
						Description
					</label>
					<Textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="mt-1"
					/>
				</div>
				<div>
					<label htmlFor="tags" className="block text-sm font-medium text-gray-700">
						Tags (comma-separated)
					</label>
					<Input
						id="tags"
						type="text"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						className="mt-1"
					/>
				</div>
				<Button type="submit" className="mt-4">
					Add Snippet
				</Button>
				{message && <p className="mt-4 text-green-600">{message}</p>}
			</form>
		</div>
	);
}
