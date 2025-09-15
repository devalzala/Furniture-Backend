const SubCategory = require("../models/subCategorySchema");
const { status, messages } = require('../utils/index');

// CREATE SubCategory
exports.createSubCategory = async (req, res) => {
    try {
        const { categoryId, categoryName, name } = req.body;

        if (!name || !categoryId || !categoryName) {
            return res.status(status.BadRequest).json({
                message: "Subcategory name and category details are required"
            });
        }

        const subCategory = new SubCategory({
            category: { categoryId, name: categoryName },
            name
        });

        await subCategory.save();

        res.status(status.OK).json({
            message: messages.SUBCATEGORY_CREATED_SUCCESSFULLY,
            subCategory
        });
    } catch (err) {
        console.error("Create SubCategory Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// READ All SubCategories
exports.getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().sort({ createdAt: -1 });

        res.status(status.OK).json({
            message: messages.SUBCATEGORIES_FETCHED_SUCCESSFULLY,
            count: subCategories.length,
            subCategories
        });
    } catch (err) {
        console.error("Get SubCategories Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// READ SubCategory by ID
exports.getSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id);

        if (!subCategory) {
            return res.status(status.NotFound).json({
                message: messages.SUBCATEGORY_NOT_FOUND
            });
        }

        res.status(status.OK).json({
            message: messages.SUBCATEGORY_FETCHED_SUCCESSFULLY,
            subCategory
        });
    } catch (err) {
        console.error("Get SubCategory By ID Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// UPDATE SubCategory by ID
exports.updateSubCategory = async (req, res) => {
    try {
        const { categoryId, categoryName, name } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (categoryId && categoryName) updateData.category = { categoryId, name: categoryName };

        const subCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!subCategory) {
            return res.status(status.NotFound).json({
                message: messages.SUBCATEGORY_NOT_FOUND
            });
        }

        res.status(status.OK).json({
            message: messages.SUBCATEGORY_UPDATED_SUCCESSFULLY,
            subCategory
        });
    } catch (err) {
        console.error("Update SubCategory Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// DELETE SubCategory by ID
exports.deleteSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

        if (!subCategory) {
            return res.status(status.NotFound).json({
                message: messages.SUBCATEGORY_NOT_FOUND
            });
        }

        res.status(status.OK).json({
            message: messages.SUBCATEGORY_DELETED_SUCCESSFULLY
        });
    } catch (err) {
        console.error("Delete SubCategory Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};
