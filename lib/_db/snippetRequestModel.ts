// lib/db/snippetRequestModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * @deprecated Use prisma orm instead
 */
export interface ISnippetRequest extends Document {
    title: string;
    language: string;
    code: string;
    description?: string;
    tags?: string[];
    category: string; // New field
    difficulty: string; // New field
    usage: string; // New field
    submittedBy: string; // User ID of the person submitting the request
}

const snippetRequestSchema: Schema = new mongoose.Schema({
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
    submittedBy: {
        type: String,
        required: true,
    }
});


/**
 * @deprecated Use prisma orm instead
 */
const SnippetRequest: Model<ISnippetRequest> =
    mongoose.models.SnippetRequest ||
    mongoose.model<ISnippetRequest>("SnippetRequest", snippetRequestSchema);

export default SnippetRequest;
