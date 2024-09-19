// lib/db/snippetModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISnippet extends Document {
	title: string;
	language: string;
	code: string;
	description?: string;
	tags?: string[];
	createdAt: Date;
}

const snippetSchema: Schema = new mongoose.Schema({
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
});

const Snippet: Model<ISnippet> =
	mongoose.models.Snippet ||
	mongoose.model<ISnippet>("Snippet", snippetSchema);

export default Snippet;
