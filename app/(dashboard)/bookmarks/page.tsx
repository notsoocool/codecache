"use client";

import Prism from "prismjs";
import Link from "next/link";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bookmark,
  BookmarkCheck,
  Copy,
  Loader2,
  Filter,
  Star,
} from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the snippet type
type Snippet = {
  _id: any;
  title: string;
  language: string;
  code: string;
  tags: string[];
  bookmarkedBy: string[];
  category: string;
  difficulty: string;
  usage: string;
};

export default function Bookmarks() {
  const { theme } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);

  const [loading, setLoading] = useState(true); // Loading state
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [copied, setCopied] = useState<number | null>(null); // For copy feedback
  const snippetsRef = useRef<HTMLDivElement>(null); // Reference to the snippets container
  const [activeSnippetId, setActiveSnippetId] = useState<string | null>(null); // To track active snippet
  const [userId, setUserId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<{ [key: string]: any }>({});
  const [hoveredRating, setHoveredRating] = useState(0);
  const router = useRouter();

  // Refs for each snippet card to track visibility
  const snippetRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const fetchBookmarkedSnippets = async (userId: any) => {
    try {
      const response = await fetch(`/api/bookmark/${userId}`, {
        method: "GET",
      });
      console.log("second", response);
      const data = await response.json();
      setSnippets(data);
    } catch (error) {
      console.error("Error fetching bookmarked snippets:", error);
    }
  };

  useEffect(() => {
    const fetchCurrentUserAndBookmarkedSnippets = async () => {
      setLoading(true);
      try {
        // Fetch the current user
        const response = await fetch("/api/getCurrentUser");
        if (!response.ok) throw new Error("Failed to fetch current user");

        const userData = await response.json();

        if (!userData || !userData.id) {
          throw new Error("Invalid user data");
        }

        // Set the user ID
        setUserId(userData.id);

        // Fetch the bookmarked snippets using the user ID
        await fetchBookmarkedSnippets(userData.id);
      } catch (error) {
        console.error(
          "Error fetching current user or bookmarked snippets:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch current user and bookmarked snippets
    fetchCurrentUserAndBookmarkedSnippets();
  }, []); // Only runs once when the component mounts

  useEffect(() => {
    const fetchRatings = async (snippetId: string) => {
      try {
        const response = await fetch(`/api/ratings/${snippetId}`);
        const data = await response.json();
        setRatings((prevRatings) => ({
          ...prevRatings,
          [snippetId]: data,
        }));
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    snippets.forEach((snippet) => fetchRatings(snippet._id));
  }, [snippets]);

  const handleBookmarkToggle = async (snippetId: string) => {
    try {
      if (!userId) {
        toast.error("User not logged in");
        router.push("/home");
        return null;
      }

      console.log("Toggling bookmark for snippet:", snippetId);
      const response = await fetch(`/api/bookmark/${snippetId}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Failed to toggle bookmark:", errorMessage);
        throw new Error("Failed to toggle bookmark");
      }

      const updatedSnippet = await response.json();
      console.log("Updated Snippet:", updatedSnippet);
      // Update your state or UI accordingly
      setSnippets(
        snippets.map((snippet) =>
          snippet._id === updatedSnippet._id ? updatedSnippet : snippet
        )
      );

      // Show success toast message
      if (updatedSnippet.bookmarkedBy.includes(userId)) {
        toast.success("Snippet bookmarked");
      } else {
        toast.success("Bookmark removed");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
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
      if (ref && ref.getBoundingClientRect().top < window.innerHeight / 2) {
        setActiveSnippetId(snippetId);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const filteredSnippets = snippets
    ? snippets.filter(
        (snippet) =>
          (snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            snippet.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
            snippet.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )) &&
          (languageFilter.length === 0 ||
            languageFilter.includes(snippet.language)) &&
          (difficultyFilter.length === 0 ||
            difficultyFilter.includes(snippet.difficulty))
      )
    : [];

  useEffect(() => {
    Prism.highlightAll(); // Reapply syntax highlighting after filtered snippets are rendered
  }, [filteredSnippets, theme, snippets]);

  const languages = Array.from(
    new Set(snippets.map((snippet) => snippet.language))
  );
  const difficulties = Array.from(
    new Set(snippets.map((snippet) => snippet.difficulty))
  );

  if (loading) {
    return (
      <div className="flex">
        <div className="w-3/12">
          <div className="sticky top-24 overflow-auto h-auto flex items-start flex-col gap-3">
            <strong className="p-2">Snippets</strong>
            <Skeleton className="mt-2 h-6 w-48" />
            <Skeleton className="mt-2 h-6 w-48 delay-150" />
            <Skeleton className="mt-2 h-6 w-48 delay-300" />
          </div>
        </div>
        <div className="p-2 pt-8 w-9/12">
          <div className="max-w-screen-2xl mx-auto w-full">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between min-h-[350px] duration-300">
              <CardHeader className="border-b border-primary-100">
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full flex items-center justify-center">
                  <Loader2 className="size-6 text-slate-300 animate-spin" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Snippet List */}
      <div className=" w-3/12">
        <div className="sticky top-24 overflow-auto h-[85vh] flex items-start flex-col gap-2">
          <div className=" flex items-center justify-between w-full">
            <strong className="p-2">Snippets</strong>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className=" h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map((lang) => (
                  <DropdownMenuCheckboxItem
                    key={lang}
                    checked={languageFilter.includes(lang)}
                    onCheckedChange={(checked) => {
                      setLanguageFilter((prev) =>
                        checked
                          ? [...prev, lang]
                          : prev.filter((l) => l !== lang)
                      );
                    }}
                  >
                    {lang}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Difficulty</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {difficulties.map((diff) => (
                  <DropdownMenuCheckboxItem
                    key={diff}
                    checked={difficultyFilter.includes(diff)}
                    onCheckedChange={(checked) => {
                      setDifficultyFilter((prev) =>
                        checked
                          ? [...prev, diff]
                          : prev.filter((d) => d !== diff)
                      );
                    }}
                  >
                    {diff}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {filteredSnippets.map((snippet) => (
            <Button
              key={snippet._id}
              variant={snippet._id === activeSnippetId ? "secondary" : "ghost"}
              onClick={() => {
                const element = document.getElementById(snippet._id);
                if (element) {
                  const elementTop =
                    element.getBoundingClientRect().top + window.scrollY; // Get the element's position relative to the document
                  window.scrollTo({
                    top: elementTop - 100, // Adjust this value for your offset
                    behavior: "smooth", // Smooth scrolling
                  });
                } else {
                  console.error("Element not found for ID:", snippet._id);
                }
              }}
            >
              <span className="text-xs font-medium">{snippet.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Snippet Cards */}
      <div className="p-2 pt-8 w-9/12">
        <div className="grid grid-cols-1 gap-6" ref={snippetsRef}>
          {filteredSnippets.map((snippet) => (
            <Link href={`/snippets/${snippet._id}`} key={snippet._id}>
              <Card
                id={snippet._id}
                ref={(el) => {
                  snippetRefs.current[snippet._id] = el;
                }}
                className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between duration-300 min-h-[350px]"
              >
                <CardHeader className=" border-b border-primary-100">
                <CardTitle className="flex flex-col sm:flex-row justify-between">
                    {snippet.title}
                    <div className="flex gap-10 flex-row-reverse items-center text-xs font-normal">
                      <div className=" flex flex-col sm:flex-row gap-2">
                        {ratings[snippet._id]?.averageRating.toFixed(1)}
                        <div className=" flex">
                          {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                              <Star
                                key={index}
                                className={`size-4 cursor-pointer transition-all ${
                                  ratingValue <=
                                  (hoveredRating ||
                                    ratings[snippet._id]?.userRating)
                                    ? "text-muted-foreground fill-muted-foreground"
                                    : "text-muted-foreground/50"
                                }`}
                              />
                            );
                          })}
                        </div>
                        <div className=" text-blue-500">
                          {ratings[snippet._id]?.totalRatings || 0} ratings
                        </div>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 relative">
                  <pre className="rounded-md max-h-[300px] overflow-y-auto p-4 overflow-x-auto text-sm">
                    <code className={`language-${snippet.language}`}>
                      {snippet.code}
                    </code>
                  </pre>
                  <Button
                    variant="outline"
                    className="absolute top-8 right-6"
                    onClick={(e) => {
                      e.stopPropagation(); // to prevent page navigation onClick of copy
                      e.nativeEvent.preventDefault(); // to prevent page navigation onClick of copy
                      handleCopy(snippet.code, snippet._id);
                    }}
                  >
                    <Copy size={16} />
                  </Button>
                  <Button
                    className="absolute top-8 right-20"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      if (snippet._id) {
                        handleBookmarkToggle(snippet._id);
                      } else {
                        console.error("Snippet ID is null");
                      }
                    }}
                  >
                    {userId && snippet.bookmarkedBy?.includes(userId) ? (
                      <BookmarkCheck size={16} />
                    ) : (
                      <Bookmark size={16} />
                    )}
                  </Button>
                  <span className="flex justify-end w-full pt-2 text-xs text-muted-foreground pr-1">
                    {snippet.difficulty}
                  </span>
                </CardContent>
                <CardFooter className="bg-primary-50 p-4 flex justify-between items-center">
                  <Badge variant="secondary" className="text-xs font-medium">
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
      </div>
    </div>
  );
}
