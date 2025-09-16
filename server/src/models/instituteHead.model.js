import mongoose from "mongoose";

const instituteHeadSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		instituteId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Institute",
		},
		fullName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		phoneNumber: {
			type: String,
			trim: true,
		},
		gender: {
			type: String,
			enum: ["Male", "Female", "Other"],
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("InstituteHead", instituteHeadSchema);
