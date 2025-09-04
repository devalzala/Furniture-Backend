const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true },
        email: { type: String, lowercase: true, trim: true },
        message: { type: String, trim: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
