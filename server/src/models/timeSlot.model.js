import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema(
	{
		counsellorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Counsellor",
			required: true,
		},
		instituteId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Institute",
		},
		date: {
			type: Date,
			required: true,
		},
		startTime: {
			type: String, // e.g., "14:00" (24-hour format)
			required: true,
		},
		endTime: {
			type: String, // e.g., "14:30"
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("TimeSlot", timeSlotSchema);
