"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Prism from "prismjs";
import { useTheme } from "next-themes";
import { ReactLenis } from "@/utils/lenis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/global/data-table";
import { columns } from "@/components/global/columns";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"; // Adjust this import based on your actual structure

// Define a snippet type
type SnippetRequest = {
  _id: string;
  title: string;
  language: string;
  code: string;
  description?: string;
  tags?: string[];
  category?: string;
  difficulty?: string;
  usage?: string;
  approved: boolean;
};

type DeleteRequest = {
  _id: string;
  snippetId: string;
  deletionRequestedBy: string;
  reason: string;
};

export default function AdminPage() {
  const { theme } = useTheme();
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const [snippetRequests, setSnippetRequests] = useState<SnippetRequest[]>([]);
  const [deleteRequests, setDeleteRequests] = useState<DeleteRequest[]>([]);
  
  // New state for dialog and reason
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [reason, setReason] = useState<string>('');
  const [currentSnippetId, setCurrentSnippetId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await fetch("/api/getCurrentUser");
        if (!response.ok) {
          throw new Error("User not authenticated");
        }

        const data = await response.json();
        const userId = data.id;
        const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || [];

        if (adminUserIds.includes(userId)) {
          setAuthorized(true);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Authorization check failed:", error);
        router.push("/");
      }
    };

    checkAuthorization();
  }, [router]);

  const updateDeleteRequests = (id: string) => {
    setDeleteRequests((prev) => prev.filter((request) => request._id !== id));
  };

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch("/api/request");
        const data = await response.json();
        setSnippetRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Failed to load requests");
      }
    }

    async function fetchDeleteRequests() {
      try {
        const response = await fetch("/api/getDeleteRequest");
        const data = await response.json();
        setDeleteRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Failed to load requests");
      }
    }

    fetchRequests();
    fetchDeleteRequests();
  }, []);

  // Approve snippet request
  const handleAccept = async (requestId: string) => {
    try {
      const response = await fetch("/api/request/accept", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId, reason }), // Include reason in request body
      });

      if (response.ok) {
        setSnippetRequests((prev) =>
          prev.filter((request) => request._id !== requestId)
        );
        toast.success("Snippet accepted and added to the database!");
        setOpenAcceptDialog(false);
        setReason('');
        setCurrentSnippetId(null);
      } else {
        toast.error("Failed to accept snippet request.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error accepting snippet request.");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      const response = await fetch("/api/request/reject", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId, reason }), // Include reason in request body
      });

      if (response.ok) {
        setSnippetRequests((prev) =>
          prev.filter((request) => request._id !== requestId)
        );
        toast.success("Snippet request rejected and deleted.");
        setOpenRejectDialog(false);
        setReason('');
        setCurrentSnippetId(null);
      } else {
        toast.error("Failed to reject snippet request.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error rejecting snippet request.");
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [theme]);

  useEffect(() => {
    Prism.highlightAll();
  }, [snippetRequests]);

  return (
    <ReactLenis root>
      <Tabs defaultValue="request" className="w-full">
        <TabsList>
          <TabsTrigger value="request">Snippet Requests</TabsTrigger>
          <TabsTrigger value="delete">Snippet Delete Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="request">
          <div className="grid grid-cols-1 gap-6">
            {snippetRequests.map((request) => (
              <Card key={request._id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {request.title}
                    <div className=" flex gap-6 text-muted-foreground text-xs">
                      <p>
                        <strong>Category:</strong> {request.category}
                      </p>
                      <p>
                        <strong>Difficulty:</strong> {request.difficulty}
                      </p>
                      <p>
                        <strong>Usage:</strong> {request.usage}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <AlertDialog open={openAcceptDialog} onOpenChange={setOpenAcceptDialog}>
                        <AlertDialogTrigger>
                          <Button onClick={() => { setCurrentSnippetId(request._id); setReason(''); }}>Approve</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Accept Snippet Request</AlertDialogTitle>
                            <AlertDialogDescription>
                              Please provide a reason for accepting this snippet.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Reason for acceptance"
                            className="border p-2 mt-2 w-full"
                          />
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setOpenAcceptDialog(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async () => {
                                await handleAccept(request._id);
                                setOpenAcceptDialog(false);
                              }}
                            >
                              Confirm Accept
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <AlertDialog open={openRejectDialog} onOpenChange={setOpenRejectDialog}>
                        <AlertDialogTrigger>
                          <Button variant="destructive" onClick={() => { setCurrentSnippetId(request._id); setReason(''); }}>Reject</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Reject Snippet Request</AlertDialogTitle>
                            <AlertDialogDescription>
                              Please provide a reason for rejecting this snippet.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Reason for rejection"
                            className="border p-2 mt-2 w-full"
                          />
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setOpenRejectDialog(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async () => {
                                await handleReject(request._id);
                                setOpenRejectDialog(false);
                              }}
                            >
                              Confirm Reject
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="rounded-md max-h-[300px] overflow-y-auto p-4 overflow-x-auto text-sm">
                    <code className={`language-${request.language}`}>
                      {request.code}
                    </code>
                  </pre>
                </CardContent>
                <CardFooter className="bg-primary-50 p-4 w-full flex flex-col items-center">
                  <div className="w-full flex justify-between">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {request.language}
                    </Badge>
                    <div className="flex gap-2">
                      {request.tags &&
                        request.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="delete">
          <div className="container mx-auto py-10">
            <DataTable columns={columns(updateDeleteRequests)} data={deleteRequests} />
          </div>
        </TabsContent>
      </Tabs>
    </ReactLenis>
  );
}
