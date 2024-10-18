// lib/db/notificationModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface INotification extends Document {
  userId: string; // The ID of the user to whom the notification belongs
  type: "snippet_request" | "deletion_request" | "admin_message"; // Type of notification
  snippetId?: mongoose.Types.ObjectId; // Optional, refers to the snippet involved in the notification
  message: string; // The reason or message content
  status: "unread" | "read"; // Status of the notification
  createdAt: Date; // Timestamp of when the notification was created
}

const notificationSchema: Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["snippet_request", "deletion_request", "admin_message"],
    required: true,
  },
  snippetId: {
    type: mongoose.Types.ObjectId,
    ref: "Snippet",
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["unread", "read"],
    default: "unread",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification: Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", notificationSchema);

export default Notification;
