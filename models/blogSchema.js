const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, trim: true },
        image: { type: String, trim: true },
        authorName: { type: String, trim: true },
        description: { type: String, trim: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);