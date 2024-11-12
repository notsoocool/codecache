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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Bookmark, Star, Trash, BookmarkCheck } from "lucide-react";
import Prism from "prismjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import router from "next/router";
import { Button } from "../ui/button";
import { ProfileData, Rating, Snippet } from "@/types";

import { useContext } from "react";
import { SearchContext } from "@/SearchContext";

interface userDetails {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
}

export default function ProfileTabs({
  profileData,
  userDetails,
}: {
  profileData: ProfileData;
  userDetails: userDetails;
}) {
  const [activeTab, setActiveTab] = useState("submitted");
  const currentUserId = userDetails.id;
  const currentUserName = userDetails.name;

  const { snippets, setSnippets } = useContext(SearchContext);

  const [bookmarkedSnippets, setBookmarkedSnippets] = useState<Snippet[]>(
    profileData.bookmarked,
  );

  const tabVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [activeTab]);

  useEffect(() => {
    setBookmarkedSnippets(profileData.bookmarked);
  }, [profileData.bookmarked]);

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

      {activeTab === "submitted" && (
        <motion.div
          key="submitted"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={tabVariants}
          transition={{ duration: 0.3 }} // Adjust transition duration
        >
          <h2 className="text-xl font-semibold">Submitted Snippets</h2>
          {profileData.snippets.length > 0 ? (
            renderSnippetList(
              profileData.snippets,
              currentUserId,
              currentUserName,
            )
          ) : (
            <SkeletonCard type="submitted" />
          )}
        </motion.div>
      )}

      {activeTab === "bookmarked" && (
        <motion.div
          key="bookmarked"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={tabVariants}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold">Bookmarked Snippets</h2>
          {bookmarkedSnippets.length > 0 ? (
            renderBookmarkedSnippetList(
              profileData.bookmarked,
              currentUserId,
              setSnippets,
              setBookmarkedSnippets,
            )
          ) : (
            <SkeletonCard type="bookmarked" />
          )}
        </motion.div>
      )}

      {activeTab === "rated" && (
        <motion.div
          key="rated"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={tabVariants}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold">Rated Snippets</h2>
          {renderRatingList(profileData.ratings)}
        </motion.div>
      )}
    </Tabs>
  );
}

const SkeletonCard = ({
  type,
}: {
  type: "submitted" | "bookmarked" | "rated";
}) => {
  // Customize the title and content based on the type
  let title = "";
  let content = "";
  let buttonLabel = "";
  let buttonLink = "";

  switch (type) {
    case "submitted":
      title = "No Snippets Submitted by You";
      content =
        "It looks like you haven't submitted any snippets yet. Start sharing your code with the community!";
      buttonLabel = "Add Your First Snippet";
      buttonLink = "/addsnippets";
      break;
    case "bookmarked":
      title = "No Bookmarked Snippets";
      content =
        "It seems like you haven't bookmarked any snippets yet. Explore and save your favorite snippets!";
      buttonLabel = "Explore Snippets";
      buttonLink = "/snippets";
      break;
    case "rated":
      title = "No Rated Snippets";
      content =
        "You haven't rated any snippets yet. Rate snippets to help others find the best ones!";
      buttonLabel = "Explore and Rate Snippets";
      buttonLink = "/snippets";
      break;
    default:
      break;
  }

  return (
    <div className="space-y-4">
      <Card className="mt-4 p-4 hover:shadow-lg transition-shadow transform hover:scale-102 text-center duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{content}</p>
          <div className="mt-4">
            <Button
              onClick={() => router.push(buttonLink)}
              className=" bg-primary py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {buttonLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const renderSnippetList = (
  snippets: Snippet[],
  currentUserId: string,
  currentUserName: string,
) => (
  <div className="space-y-4">
    {snippets.map((snippet) => {
      const [openDialog, setOpenDialog] = useState(false);
      const [deletionReason, setDeletionReason] = useState("");

      const handleDelete = async (snippetId: string) => {
        const response = await fetch(`/api/snippets/${snippet._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUserId, // Send the current user ID
            snippetId: snippetId, // Snippet ID to be deleted
            reason: deletionReason,
            userName: currentUserName,
          }),
        });

        if (response.ok) {
          toast.success("Snippet delete request sent successfully");
        } else {
          toast.error("Failed to request snippet deletion");
        }
      };

      return (
        <Card
          key={snippet._id}
          className="mt-4 hover:shadow-lg transition-shadow transform hover:scale-102 duration-300"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              <div className="flex justify-between items-center">
                {snippet.title}
                <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                  <AlertDialogTrigger>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <Trash className="w-5 h-5" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. Please provide a reason
                        for deleting this snippet.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <input
                      type="text"
                      value={deletionReason}
                      onChange={(e) => setDeletionReason(e.target.value)}
                      placeholder="Reason for deletion"
                      className="border p-2 mt-2 w-full"
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          await handleDelete(snippet._id);
                          setOpenDialog(false);
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardTitle>
            <CardDescription>{snippet.description}</CardDescription>
            <div className="flex">
              <h3 className="text-gray-500 mt-2 text-sm mr-1">Related Tags:</h3>
              <div className="flex gap-2 flex-wrap mt-2">
                {snippet.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 relative">
              <pre className="rounded-md max-h-[300px] overflow-y-auto p-4 overflow-x-auto text-sm bg-gray-50 border border-gray-200">
                <code className={`language-${snippet.language}`}>
                  {snippet.code}
                </code>
              </pre>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4" />
                <span>
                  {snippet.bookmarkedBy ? snippet.bookmarkedBy.length : 0}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{snippet.language}</Badge>
                {snippet.category && (
                  <Badge variant="secondary">{snippet.category}</Badge>
                )}
                <Badge variant="secondary">{snippet.usage}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    })}
  </div>
);

const renderBookmarkedSnippetList = (
  snippets: Snippet[],
  currentUserId: string,
  setSnippets: any,
  setBookmarkedSnippets: any,
) => (
  <div className="space-y-4">
    {snippets.map((snippet) => {
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
          setSnippets((prevSnippets: Snippet[]) =>
            prevSnippets.map((snippet) =>
              snippet._id === updatedSnippet._id ? updatedSnippet : snippet,
            ),
          );

          // Show success toast message
          if (updatedSnippet.bookmarkedBy.includes(currentUserId)) {
            setBookmarkedSnippets((prev: Snippet[]) =>
              prev.find((snippet) => snippet._id === updatedSnippet._id)
                ? prev.map((snippet) =>
                    snippet._id === updatedSnippet._id
                      ? updatedSnippet
                      : snippet,
                  )
                : [...prev, updatedSnippet],
            );
          } else {
            setBookmarkedSnippets((prev: Snippet[]) =>
              prev.filter((snippet) => snippet._id !== updatedSnippet._id),
            );
          }

          toast.success(
            updatedSnippet.bookmarkedBy.includes(currentUserId)
              ? "Snippet bookmarked"
              : "Bookmark removed",
          );
        } catch (error) {
          console.error("Error toggling bookmark:", error);
          toast.error("Error toggling bookmark");
        }
      };

      return (
        <Link href={`/snippets/${snippet._id}`} key={snippet._id}>
          <Card
            key={snippet._id}
            className="mt-4 hover:shadow-lg transition-shadow transform hover:scale-102 duration-300"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {snippet.title}
              </CardTitle>
              <CardDescription>{snippet.description}</CardDescription>
              <div className="flex">
                <h3 className="text-gray-500 mt-2 text-sm mr-1">
                  Related Tags:
                </h3>
                <div className="flex gap-2 flex-wrap mt-2">
                  {snippet.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 relative">
                <pre className="rounded-md max-h-[300px] overflow-y-auto p-4 overflow-x-auto text-sm bg-gray-50 border border-gray-200">
                  <code className={`language-${snippet.language}`}>
                    {snippet.code}
                  </code>
                </pre>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Button
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
                    {currentUserId &&
                    snippet.bookmarkedBy?.includes(currentUserId) ? (
                      <BookmarkCheck size={16} />
                    ) : (
                      <Bookmark size={16} />
                    )}
                  </Button>
                  <span>
                    {snippet.bookmarkedBy ? snippet.bookmarkedBy.length : 0}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{snippet.language}</Badge>
                  {/* <Badge variant="secondary">
									{snippet.category}
								</Badge> */}
                  <Badge variant="secondary">{snippet.usage}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      );
    })}
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
