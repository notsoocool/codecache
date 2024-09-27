// lib/db/ratingModel.ts

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRating extends Document {
	snippetId: mongoose.Schema.Types.ObjectId;
	userId: string; // Clerk user ID or any unique user identifier
	rating: number;
	averageRating: number;
}

const ratingSchema: Schema = new mongoose.Schema(
	{
		snippetId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Snippet",
			required: true,
		},
		userId: {
			type: String, // No reference to a User model
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 0,
			max: 5,
		},
		averageRating: {
			type: Number,
			default: 0,
			min: 0,
			max: 5,
		},
	},
	{
		timestamps: true,
	}
);

const Rating: Model<IRating> =
	mongoose.models.Rating || mongoose.model<IRating>("Rating", ratingSchema);

export default Rating;
