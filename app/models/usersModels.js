const { Schema, model } = require("mongoose");
const userSchema = new Schema(
	{
		name: { type: String, require: true },
		lastName: { type: String, require: true },
		dateOfBirth: { type: String, require: true },
		email: { type: String, require: true, lowercase: true, trim: true },
		phone: { type: String, require: true },
		address: { type: String, require: true },
		user: { type: String, require: true, unique: true },
		password: { type: String, require: true },
	},
	{ timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
