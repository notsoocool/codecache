import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  snippetId: mongoose.Types.ObjectId;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema: Schema = new mongoose.Schema({
  snippetId: {
    type: Schema.Types.ObjectId,
    ref: 'Snippet',
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment: Model<IComment> =
  mongoose.models.Comment ||
  mongoose.model<IComment>("Comment", commentSchema);

export default Comment;