import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		studentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
			required: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: String,
			enum: [
				"academic-stress",
				"anxiety",
				"depression",
				"relationship",
				"career",
				"general",
			],
			default: "general",
		},
		tags: [
			{
				type: String,
				trim: true,
			},
		],
		isAnonymous: {
			type: Boolean,
			default: false, // if true, hide student details when displaying
		},
		status: {
			type: String,
			enum: ["open", "resolved"],
			default: "open",
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Post", postSchema);
