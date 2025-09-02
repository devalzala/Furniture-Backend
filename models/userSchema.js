const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    dob: { type: Date, required: true }, // Date of Birth
    mobile: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["Admin", "User", "Vendor"],
        default: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
