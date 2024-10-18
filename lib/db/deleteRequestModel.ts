// lib/db/deleteRequestModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISDeleteRequest extends Document {
  snippetId: string; // New field
  deletionRequestedBy: string; // User ID of the person submitting the request
  reason: string;
}

const deleteRequestSchema: Schema = new mongoose.Schema({
  snippetId: {
    // New field
    type: String,
    required: true,
  },
  deletionRequestedBy: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});

const DeleteRequest: Model<ISDeleteRequest> =
  mongoose.models.DeleteRequest ||
  mongoose.model<ISDeleteRequest>("DeleteRequest", deleteRequestSchema);

export default DeleteRequest;
