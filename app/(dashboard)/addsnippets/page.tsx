"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
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
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const languages = [
    "Java",
    "Python",
    "JavaScript",
    "C++",
    "C#",
    "Go",
    "Kotlin",
    "Ruby",
    "Swift",
    "PHP",
    "TypeScript",
    "Rust",
    "Dart",
    "Scala",
    "Perl",
    "R",
    "Elixir",
    "Haskell",
    "Lua",
    "C",
    "MATLAB",
    "Shell",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = tags.split(",").map((tag) => tag.trim());

    if (!title) {
      toast.error("Title can't be empty");
      return;
    }
    if (!language) {
      toast.error("Language cannot be empty");
      return;
    }
    if (!code) {
      toast.error("Code cannot be empty");
      return;
    }
    if (!category) {
      toast.error("Category cannot be empty");
      return;
    }
    if (!difficulty) {
      toast.error("Difficulty cannot be empty");
      return;
    }
    if (!usage) {
      toast.error("Usage cannot be empty");
      return;
    }

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
        toast.success("Snippet requested for review");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error("Failed to add snippet. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full p-8">
      <h1 className="text-4xl font-bold mb-6">Add New Snippet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-muted-foreground/80"
          >
            Title
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1  max-w-[15vw]"
          />
        </div>
        <div>
          <label
            htmlFor="language"
            className="block text-sm font-medium text-muted-foreground/80"
          >
            Language
          </label>
          <Select onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-muted-foreground/80"
          >
            Code
          </label>
          <Textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1  max-w-[40vw]"
            ref={codeRef}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-muted-foreground/80"
          >
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 max-w-[40vw]"
            ref={descriptionRef}
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-muted-foreground/80"
          >
            Tags (comma-separated)
          </label>
          <Input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 max-w-[20vw]"
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-muted-foreground/80"
            >
              Category
            </label>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Algorithm">Algorithm</SelectItem>
                  <SelectItem value="Data Structure">Data Structure</SelectItem>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Mobile Development">
                    Mobile Development
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
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
                  <SelectItem value="Educational">Educational</SelectItem>
                  <SelectItem value="Utility">Utility</SelectItem>
                  <SelectItem value="Template">Template</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className=" flex justify-end">
          <Button
            type="submit"
            className="mt-4 hover:border hover:border-foreground hover:text-foreground hover:bg-transparent "
          >
            Add Snippet
          </Button>
        </div>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
}
