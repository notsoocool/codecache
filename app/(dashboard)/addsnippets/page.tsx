"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ReactLenis } from "@/utils/lenis";

export default function AddSnippet() {
	const [title, setTitle] = useState("");
	const [language, setLanguage] = useState("");
	const [code, setCode] = useState("");
	const [description, setDescription] = useState("");
	const [tags, setTags] = useState("");
	const [category, setCategory] = useState("");
	const [difficulty, setDifficulty] = useState("");
	const [usage, setUsage] = useState("");
	const [message, setMessage] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Prepare tags as an array
		const tagsArray = tags.split(",").map((tag) => tag.trim());

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
					category, // Add category
					difficulty, // Add difficulty
					usage, // Add usage
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
		<ReactLenis root>
			<div className="p-8">
				<h1 className="text-4xl font-bold mb-6">Add New Snippet</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="title"
							className="block text-sm font-medium text-gray-700"
						>
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
						<label
							htmlFor="language"
							className="block text-sm font-medium text-gray-700"
						>
							Language
						</label>
						<Select onValueChange={setLanguage}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select Language" />
								</SelectTrigger>
								<SelectContent className="overflow-y-auto scroll-smooth" >
									<SelectGroup>
										{/* all the popular programming values */}
									<SelectItem value="Java">
										Java
										</SelectItem>
									<SelectItem value="Python">
										Python
										</SelectItem>
									<SelectItem value="JavaScript">
										JavaScript
										</SelectItem>
									<SelectItem value="C++">
										C
										++</SelectItem>
									<SelectItem value="C#">
										C
										#</SelectItem>
									<SelectItem value="Go">
										Go
										</SelectItem>
									<SelectItem value="Kotlin">
										Kotlin
										</SelectItem>
									<SelectItem value="Ruby">
										Ruby
										</SelectItem>
									<SelectItem value="Swift">
										Swift
										</SelectItem>
									<SelectItem value="PHP">
										PHP
										</SelectItem>
									<SelectItem value="TypeScript">
										TypeScript
										</SelectItem>
									<SelectItem value="Rust">
										Rust
										</SelectItem>
									<SelectItem value="Dart">
										Dart
										</SelectItem>
									<SelectItem value="Scala">
										Scala
										</SelectItem>
									<SelectItem value="Perl">
										Perl
										</SelectItem>
									<SelectItem value="R">
										R
										</SelectItem>
									<SelectItem value="Elixir">
										Elixir
										</SelectItem>
									<SelectItem value="Haskell">
										Haskell
										</SelectItem>
									<SelectItem value="Lua">
										Lua
										</SelectItem>
									<SelectItem value="C">
										C
										</SelectItem>
									<SelectItem value="MATLAB">
										MATLAB
										</SelectItem>
									<SelectItem value="Shell">
										Shell
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
					</div>
					<div>
						<label
							htmlFor="code"
							className="block text-sm font-medium text-gray-700"
						>
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
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700"
						>
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
						<label
							htmlFor="tags"
							className="block text-sm font-medium text-gray-700"
						>
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
					<div className="flex gap-6">
						<div>
							<label
								htmlFor="category"
								className="block text-sm font-medium text-gray-700"
							>
								Category
							</label>
							<Select onValueChange={setCategory}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select a category" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="Algorithm">
											Algorithm
										</SelectItem>
										<SelectItem value="Data Structure">
											Data Structure
										</SelectItem>
										<SelectItem value="Web Development">
											Web Development
										</SelectItem>
										<SelectItem value="Mobile Development">
											Mobile Development
										</SelectItem>
										<SelectItem value="Other">
											Other
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div>
							<label
								htmlFor="difficulty"
								className="block text-sm font-medium text-gray-700"
							>
								Difficulty
							</label>
							<Select onValueChange={setDifficulty}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select difficulty level" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="Beginner">
											Beginner
										</SelectItem>
										<SelectItem value="Intermediate">
											Intermediate
										</SelectItem>
										<SelectItem value="Advanced">
											Advanced
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div>
							<label
								htmlFor="usage"
								className="block text-sm font-medium text-gray-700"
							>
								Usage
							</label>

							<Select onValueChange={setUsage}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select usage type" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="Educational">
											Educational
										</SelectItem>
										<SelectItem value="Utility">
											Utility
										</SelectItem>
										<SelectItem value="Template">
											Template
										</SelectItem>
										<SelectItem value="Other">
											Other
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className=" flex justify-end">
						<Button type="submit" className="mt-4">
							Add Snippet
						</Button>
					</div>
					{message && (
						<p className="mt-4 text-green-600">{message}</p>
					)}
				</form>
			</div>
		</ReactLenis>
	);
}
