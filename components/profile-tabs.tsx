"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Bookmark, Code, MessageSquare, Star } from "lucide-react";
import Prism from "prismjs";
import Link from "next/link";
export default function ProfileTabs({
  profileData,
}: {
  profileData: ProfileData;
}) {
  const [activeTab, setActiveTab] = useState("submitted");

  useEffect(() => {
    Prism.highlightAll();
  }, [activeTab]);

  return (
    <Tabs defaultValue="submitted" className="space-y-4">
      <TabsList>
        <TabsTrigger
          value="submitted"
          onClick={() => setActiveTab("submitted")}
        >
          Submitted Snippets
        </TabsTrigger>
        <TabsTrigger
          value="bookmarked"
          onClick={() => setActiveTab("bookmarked")}
        >
          Bookmarked Snippets
        </TabsTrigger>
        <TabsTrigger value="rated" onClick={() => setActiveTab("rated")}>
          Rated Snippets
        </TabsTrigger>
      </TabsList>
      <TabsContent value="submitted" className="space-y-4">
        <h2 className="text-xl font-semibold">Submitted Snippets</h2>
        {renderSnippetList(profileData.snippets)}
      </TabsContent>
      <TabsContent value="bookmarked" className="space-y-4">
        <h2 className="text-xl font-semibold">Bookmarked Snippets</h2>
        {renderSnippetList(profileData.bookmarked)}
      </TabsContent>
      <TabsContent value="rated" className="space-y-4">
        <h2 className="text-xl font-semibold">Rated Snippets</h2>
        {renderRatingList(profileData.ratings)}
      </TabsContent>
    </Tabs>
  );
}

const renderSnippetList = (snippets: Snippet[]) => (
  <div className="space-y-4">
    {snippets.map((snippet) => (
      <Link href={`/snippets/${snippet._id}`} key={snippet._id}>
        <Card key={snippet._id}>
          <CardHeader>
            <CardTitle>{snippet.title}</CardTitle>
            <CardDescription>{snippet.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 relative">
              <pre className="rounded-md max-h-[300px] overflow-y-auto p-4 overflow-x-auto text-sm">
                <code className={`language-${snippet.language}`}>
                  {snippet.code}
                </code>
              </pre>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4" />
                <span>{snippet.bookmarkedBy.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{snippet.language}</Badge>
                <Badge variant="secondary">{snippet.category}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    ))}
  </div>
);
const renderRatingList = (rating: Rating[]) => (
  <div className="space-y-4">
    {rating.map((rate) => (
      <Card key={rate._id}>
        <CardHeader>
          <CardTitle>{rate.snippetId.title}</CardTitle>
          <CardDescription>
            <Badge variant="secondary">{rate.snippetId.language}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Ratings</span>
              <span>{rate.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-teal-400" />
              <span>Average Ratings</span>
              <span>{rate.averageRating}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);
