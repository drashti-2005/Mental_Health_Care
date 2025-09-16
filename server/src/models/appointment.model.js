import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
	{
		studentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
			required: true,
		},
		counsellorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Counsellor",
			required: true,
		},
		timeSlotId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "TimeSlot",
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "confirmed", "completed", "cancelled"],
			default: "pending",
		},
		reason: {
			type: String, // Optional: student can enter reason for appointment
			trim: true,
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

export default mongoose.model("Appointment", appointmentSchema);
