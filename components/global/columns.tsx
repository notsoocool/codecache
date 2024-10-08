"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
export type DeleteRequest = {
  _id: string;
  snippetId: string;
  deletionRequestedBy: string;
  reason: string;
};

export const columns: ColumnDef<DeleteRequest>[] = [
  {
    accessorKey: "snippetId",
    header: "Snippet ID",
  },
  {
    accessorKey: "deletionRequestedBy",
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

      const handleAccept = async (requestId: string) => {
        try {
          const response = await fetch("/api/getDeleteRequest/accept", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ requestId }),
          });

          if (!response.ok) {
            console.error("Error accepting request:", response.statusText);
          } else {
            console.log(`Accepted request with ID: ${requestId}`);
          }
        } catch (error) {
          console.error("Error accepting request:", error);
        }
      };

      const handleReject = async (requestId: string) => {
        try {
            console.log('first')
          const response = await fetch("/api/getDeleteRequest/reject", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ requestId }),
          });

          if (!response.ok) {
            console.error("Error rejecting request:", response.statusText);
          } else {
            console.log(`Rejected request with ID: ${requestId}`);
          }
        } catch (error) {
          console.error("Error rejecting request:", error);
        }
      };

      return (
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
              onSelect={() => handleAccept(request._id)}
            >
              Accept
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => handleReject(request._id)}
            >
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
