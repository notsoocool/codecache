"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
export type DeleteRequest = {
  _id: string;
  snippetId: string;
  name: string;
  reason: string;
};

export const columns: (updateDeleteRequests: (id: string) => void) => ColumnDef<DeleteRequest>[] = (updateDeleteRequests) => [
  {
    accessorKey: "snippetId",
    header: "Snippet ID",
  },
  {
    accessorKey: "name",
    header: "Requested By",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;

      const [openDialog, setOpenDialog] = useState(false); // Modal open state
      const [reason, setReason] = useState(""); // Reason input state
      const [actionType, setActionType] = useState<"accept" | "reject">(); // Accept or Reject

      const handleAction = async () => {
        try {
          const url =
            actionType === "accept"
              ? "/api/getDeleteRequest/accept"
              : "/api/getDeleteRequest/reject";

          const response = await fetch(url, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ requestId: request._id, reason }),
          });

          if (!response.ok) {
            console.error("Error processing request:", response.statusText);
            if (actionType === "accept") {
              toast.error("Snippet can't be deleted from the database!");
            } else {
              toast.error("Snippet request can't be rejected!");
            }
          } else {
            updateDeleteRequests(request._id);
            toast.success(
              actionType === "accept"
                ? "Snippet deleted from the database!"
                : "Snippet deletion request rejected!"
            );
          }
        } catch (error) {
          console.error("Error processing request:", error);
          toast.error("Error processing request: " + error);
        } finally {
          setOpenDialog(false);
          setReason("");
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={() => {
                  setActionType("accept");
                  setOpenDialog(true);
                }}
              >
                Accept
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  setActionType("reject");
                  setOpenDialog(true);
                }}
              >
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* AlertDialog for Accept/Reject Reason */}
          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {actionType === "accept"
                    ? "Are you sure you want to accept?"
                    : "Are you sure you want to reject?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {actionType === "accept"
                    ? "This action will delete the snippet from the database."
                    : "This action will reject the deletion request."}
                  <br />
                  Please provide a reason for this action:
                </AlertDialogDescription>
              </AlertDialogHeader>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for action"
                className="border p-2 mt-2 w-full"
              />
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleAction}>
                  {actionType === "accept" ? "Accept" : "Reject"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
