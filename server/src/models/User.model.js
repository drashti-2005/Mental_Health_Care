import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		role: {
			type: String,
			enum: ["admin", "student", "counsellor", "volunteer", "institute-head"],
			default: "student",
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		resetPasswordToken: String,
		resetPasswordExpires: Date,
	},
	{
		timestamps: true,
	}
);

// Hash the password before saving
// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("password")) return next();

// 	try {
// 		const salt = await bcrypt.genSalt(10);
// 		this.password = await bcrypt.hash(this.password, salt);
// 		next();
// 	} catch (error) {
// 		next(error);
// 	}
// });

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
	try {
		// return await bcrypt.compare(candidatePassword, this.password);
		if (candidatePassword === this.password) {
			return true;
		}
	} catch (error) {
		throw error;
	}
};

export default mongoose.model("User", userSchema);
