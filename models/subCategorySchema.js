const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        categoryId: { type: String },
        name: { type: String, trim: true },
    },
    { timestamps: true }
);

const subCategorySchema = new mongoose.Schema(
    {
        category: categorySchema,
        name: { type: String, trim: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Sub Category", subCategorySchema)