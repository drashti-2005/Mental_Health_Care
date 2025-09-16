import mongoose from "mongoose";

const tipSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
			trim: true, // The actual tip or advice
		},
		category: {
			type: String,
			enum: [
				"stress-management",
				"study-hacks",
				"sleep",
				"mindfulness",
				"motivation",
				"self-care",
				"others",
			],
			default: "others",
		},
		language: {
			type: String,
			default: "English",
		},
		uploadedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Admin or counsellor usually
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Tip", tipSchema);
