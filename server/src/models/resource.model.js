import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		type: {
			type: String,
			enum: ["audio", "video", "document"],
			required: true,
		},
		url: {
			type: String, // Cloud storage / YouTube / Drive / Cloudinary link
			required: true,
		},
		language: {
			type: String,
			default: "English", // can also store "Hindi", "Malayalam", etc.
		},
		category: {
			type: String,
			enum: [
				"relaxation",
				"meditation",
				"coping-strategies",
				"awareness",
				"self-help",
				"others",
			],
			default: "others",
		},
		uploadedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // usually counsellor or admin
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
