import mongoose from "mongoose";

const counsellorSchema = new mongoose.Schema(
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
		department: {
			type: String,
			trim: true,
		},
		qualification: {
			type: String,
			trim: true,
		},
		specialization: {
			type: String,
			trim: true,
		},
		experience: {
			type: Number, // in years
		},
		dateOfBirth: {
			type: Date,
			required: true,
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

export default mongoose.model("Counsellor", counsellorSchema);
