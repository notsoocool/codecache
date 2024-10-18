// lib/db/snippetModel.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ISnippet extends Document {
  title: string;
  language: string;
  code: string;
  description?: string;
  tags?: string[];
  category: string;
  difficulty: string;
  usage: string;
  userId: string;
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
  userId: {
    type: String,
    required: true,
  },
  bookmarkedBy: {
    type: [String],
    default: [],
  },
});

const Snippet: Model<ISnippet> =
  mongoose.models.Snippet || mongoose.model<ISnippet>("Snippet", snippetSchema);

export default Snippet;
