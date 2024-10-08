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
import { Badge } from "./ui/badge";
import {
  Bookmark,
  Code,
  MessageSquare,
  Star,
  Delete,
  Trash,
} from "lucide-react";
import Prism from "prismjs";
import Link from "next/link";

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
        {renderSnippetList(profileData.snippets, currentUserId)}
      </TabsContent>
      <TabsContent value="bookmarked" className="space-y-4">
        <h2 className="text-xl font-semibold">Bookmarked Snippets</h2>
        {renderBookmarkedSnippetList(profileData.bookmarked)}
      </TabsContent>
      {/* <TabsContent value="rated" className="space-y-4">
        <h2 className="text-xl font-semibold">Rated Snippets</h2>
        {renderRatingList(profileData.ratings)}
      </TabsContent> */}
    </Tabs>
  );
}

// const renderSnippetList = (snippets: Snippet[]) => (
//   <div className="space-y-4">
//     {snippets.map((snippet) => (
//       <Card key={snippet._id} className="mt-4 shadow-lg transition-transform transform hover:scale-102 hover:shadow-xl">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold">
//             <div className="flex justify-between items-center">
//               {snippet.title}
//               <button
//                 onClick={async () => {
//                   const response = await fetch(`/api/snippets/${snippet._id}`, {
//                     method: 'DELETE',
//                   });
//                   if (response.ok) {
//                     // setSnippets((prev) => prev.filter((s) => s._id !== snippet._id));
//                     window.location.reload();
//                   } else {
//                     // Handle error (optional)
//                     console.error("Failed to delete snippet");
//                   }
//                 }}
//                 className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
//               >
//                 <Trash className="w-5 h-5 color" />
//               </button>
//             </div>
//           </CardTitle>
//           <CardDescription>{snippet.description}</CardDescription>
//           <div className="flex">
//             <h3 className="text-gray-500 mt-2 text-sm mr-1">Related Tags:</h3>
//             <div className="flex gap-2 flex-wrap mt-2">
//               {snippet.tags.map((tag) => (
//                 <Badge key={tag} variant="secondary">
//                   {tag}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="p-4 relative">
//             <pre className="rounded-md max-h-[300px] overflow-y-auto p-4 overflow-x-auto text-sm bg-gray-50 border border-gray-200">
//               <code className={`language-${snippet.language}`}>
//                 {snippet.code}
//               </code>
//             </pre>
//           </div>
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-2">
//               <Bookmark className="w-4 h-4" />
//               <span>
//                 {snippet.bookmarkedBy ? snippet.bookmarkedBy.length : 0}
//               </span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Badge variant="secondary">{snippet.language}</Badge>
//               <Badge variant="secondary">{snippet.category}</Badge>
//               <Badge variant="secondary">{snippet.usage}</Badge>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     ))}
//   </div>
// );

const renderSnippetList = (snippets: Snippet[], currentUserId: string) => (
  <div className="space-y-4">
    {snippets.map((snippet) => {
      const [openDialog, setOpenDialog] = useState(false);
      const [deletionReason, setDeletionReason] = useState("");

      const handleDelete = async (snippetId: string) => {
        const response = await fetch(`/api/snippets/${snippet._id}`, {
          method: "POST", // Change to POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUserId, // Send the current user ID
            snippetId: snippetId,   // Snippet ID to be deleted
            reason: deletionReason, // Send the deletion reason
          }),
        });

        if (response.ok) {
          // window.location.reload(); // Reload the page on successful deletion
          console.log('first')
        } else {
          console.error("Failed to delete snippet");
        }
      };

      return (
        <Card
          key={snippet._id}
          className="mt-4 shadow-lg transition-transform transform hover:scale-102 hover:shadow-xl"
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
                <Badge variant="secondary">{snippet.category}</Badge>
                <Badge variant="secondary">{snippet.usage}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    })}
  </div>
);

const renderBookmarkedSnippetList = (snippets: Snippet[]) => (
  <div className="space-y-4">
    {snippets.map((snippet) => (
      <Link href={`/snippets/${snippet._id}`} key={snippet._id}>
        <Card
          key={snippet._id}
          className="mt-4 shadow-lg transition-transform transform hover:scale-102 hover:shadow-xl"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {snippet.title}
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
                <Badge variant="secondary">{snippet.category}</Badge>
                <Badge variant="secondary">{snippet.usage}</Badge>
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
