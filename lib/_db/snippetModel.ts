// lib/db/snippetModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * @deprecated Use prisma orm instead
 */
export interface ISnippet extends Document {
	title: string;
	language: string;
	code: string;
	description?: string;
	tags?: string[];
	category: string;
	difficulty: string;
	usage: string;
	bookmarkedBy: string[];
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
	category: {
		type: String,
		required: true,
	},
	difficulty: {
		type: String,
		required: true,
	},
	usage: {
		type: String,
		required: true,
	},
	bookmarkedBy: {
		type: [String],
		default: [],
	},
});

/**
 * @deprecated Use prisma orm instead
 */
const Snippet: Model<ISnippet> =
	mongoose.models.Snippet ||
	mongoose.model<ISnippet>("Snippet", snippetSchema);

export default Snippet;