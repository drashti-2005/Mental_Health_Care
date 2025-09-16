import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
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
		enrollmentNumber: {
			type: String,
			required: true,
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
		passoutYear: {
			type: Number,
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

export default mongoose.model("Volunteer", volunteerSchema);
