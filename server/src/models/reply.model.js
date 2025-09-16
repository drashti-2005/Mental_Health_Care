import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
	{
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		volunteerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Volunteer",
			required: true,
		},
		content: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Reply", replySchema);
