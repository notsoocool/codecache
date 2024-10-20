"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { BookCheckIcon, MailCheckIcon, MailOpenIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

import { Notification } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    async function fetchNotifications() {
      try {
        setLoading(true); // Start loading
        const response = await fetch("/api/notifications");
        if (!response.ok) {
          throw new Error("Failed to load notifications");
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to load notifications");
      } finally {
        setLoading(false); // Stop loading
      }
    }

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/markAsRead`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId }),
      });

      if (response.ok) {
        // Update the notification's status to "read"
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId ? { ...notif, status: "read" } : notif,
          ),
        );
        toast.success("Notification marked as read");
      } else {
        toast.error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  const markAsUnread = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/markAsUnread`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId }),
      });

      if (response.ok) {
        // Update the notification's status to "unread"
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId
              ? { ...notif, status: "unread" }
              : notif,
          ),
        );
        toast.success("Notification marked as unread");
      } else {
        toast.error("Failed to mark notification as unread");
      }
    } catch (error) {
      console.error("Error marking notification as unread:", error);
      toast.error("Failed to mark notification as unread");
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/deleteNotification`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId }),
      });

      if (response.ok) {
        // Remove the notification from the state after it is deleted
        setNotifications((prev) =>
          prev.filter((notif) => notif._id !== notificationId),
        );
        toast.success("Notification deleted");
      } else {
        toast.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {/* Loading Indicator */}
      {loading ? (
        <div className="grid gap-2">
          <Card className="py-3  flex justify-between items-center px-2">
            <Skeleton className=" h-6 w-[30vw]" />

            <Skeleton className=" h-4 w-[10vw]" />
          </Card>
          <Card className="py-3 opacity-60 flex justify-between items-center px-2">
            <Skeleton className=" h-6 w-[30vw]" />

            <Skeleton className=" h-4 w-[10vw]" />
          </Card>
          <Card className="py-3 opacity-40  flex justify-between items-center px-2">
            <Skeleton className=" h-6 w-[30vw]" />

            <Skeleton className=" h-4 w-[10vw]" />
          </Card>
        </div>
      ) : notifications.length === 0 ? (
        // No notifications message
        <div className="flex flex-col h-[50vh] justify-center items-center">
          <Image
            src="/emptyinbox.png"
            alt="Empty Inbox"
            width="200"
            height="200"
            className=" dark:invert"
          />
          <h1 className=" font-semibold">You're all caught up!</h1>
          <p className=" text-muted-foreground">
            Take a break, explore some snippets, or write your next great piece
            of code.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {notifications.map((notification) => (
            <div className="relative" key={notification._id}>
              <Card
                className={`${
                  notification.status === "unread"
                    ? "border-blue-500"
                    : "border-gray-200 dark:border-gray-800"
                } group relative hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:ml-1 duration-150 transition-all`}
              >
                <div className="px-2 py-1 h-12 flex items-center justify-between">
                  <div>
                    <p>{notification.message}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 group-hover:hidden">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                    <div className="hidden group-hover:flex gap-2 items-center">
                      {notification.status === "unread" ? (
                        <Button
                          variant="outline"
                          onClick={() => markAsRead(notification._id)}
                        >
                          <MailCheckIcon />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => markAsUnread(notification._id)}
                        >
                          <MailOpenIcon />
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        onClick={() => deleteNotification(notification._id)}
                      >
                        <BookCheckIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
