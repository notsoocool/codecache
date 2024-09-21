import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISnippetRequest extends Document {
	title: string;
	language: string;
	code: string;
	description?: string;
	tags?: string[];
	createdAt: Date;
	submittedBy: string;  // User ID of the person submitting the request
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
	createdAt: {
		type: Date,
		default: Date.now,
	},
	submittedBy: {
		type: String,
		required: true, // User ID of the person submitting the snippet
	}
});

const SnippetRequest: Model<ISnippetRequest> =
	mongoose.models.SnippetRequest ||
	mongoose.model<ISnippetRequest>("SnippetRequest", snippetRequestSchema);

export default SnippetRequest;
