// lib/db/deleteRequestModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISDeleteRequest extends Document {
	title: string;
	language: string;
	code: string;
	description?: string;
	tags?: string[];
	category: string; // New field
	difficulty: string; // New field
	usage: string; // New field
	deletionRequestedBy: string; // User ID of the person submitting the request
    reason: string;
}

const deleteRequestSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    tags: {
        type: [String],
    },
    category: {            // New field
        type: String,
        required: true,
    },
    difficulty: {         // New field
        type: String,
        required: true,
    },
    usage: {              // New field
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
