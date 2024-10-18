"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";

type Notification = {
	_id: string;
	type: string;
	snippetId?: string;
	message: string;
	status: "unread" | "read";
	createdAt: string;
};

export default function NotificationsPage() {
	const [notifications, setNotifications] = useState<Notification[]>([]);

	// Fetch notifications on component mount
	useEffect(() => {
		async function fetchNotifications() {
			try {
				const response = await fetch("/api/notifications");
				if (!response.ok) {
					throw new Error("Failed to load notifications");
				}

				const data = await response.json();
				setNotifications(data);
			} catch (error) {
				console.error("Error fetching notifications:", error);
				toast.error("Failed to load notifications");
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
						notif._id === notificationId
							? { ...notif, status: "read" }
							: notif
					)
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
							: notif
					)
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
			const response = await fetch(
				`/api/notifications/deleteNotification`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ notificationId }),
				}
			);

			if (response.ok) {
				// Remove the notification from the state after it is deleted
				setNotifications((prev) =>
					prev.filter((notif) => notif._id !== notificationId)
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
			<div className="grid grid-cols-1 gap-6">
				{notifications.length === 0 ? (
					<p>No notifications found.</p>
				) : (
					notifications.map((notification) => (
						<Card
							key={notification._id}
							className={`${
                                notification.status === "unread"
                                    ? "border-blue-500"
                                    : "border-gray-200"
                            }`}
						>
							<CardHeader>
								<CardTitle>{notification.type}</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{notification.message}</p>
								<p className="text-xs text-gray-500">
									{new Date(
										notification.createdAt
									).toLocaleString()}
								</p>
							</CardContent>
							<CardFooter className="flex justify-end space-x-2">
								{notification.status === "unread" ? (
									<Button
										variant="outline"
										onClick={() =>
											markAsRead(notification._id)
										}
									>
										Mark as Read
									</Button>
								) : (
									<Button
										variant="outline"
										onClick={() =>
											markAsUnread(notification._id)
										}
									>
										Mark as Unread
									</Button>
								)}
								<Button
									variant="destructive"
									onClick={() =>
										deleteNotification(notification._id)
									}
								>
									Delete
								</Button>
							</CardFooter>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
