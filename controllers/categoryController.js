const Category = require("../models/categorySchema");
const { status, messages } = require('../utils/index');

// CREATE Category
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(status.BadRequest).json({
                message: "Category name is required"
            });
        }

        const category = new Category({ name });
        await category.save();

        res.status(status.OK).json({
            message: messages.CATEGORY_CREATED_SUCCESSFULLY,
            category,
        });
    } catch (err) {
        console.error("Create Category Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// READ All Categories
exports.getAllCategories = async (req, res) => {
    try {
        const { search } = req.query;
        
        let findObject = {}

        if (search && search !== "") {
            findObject.name = { $regex: search, $options: "i" };
        }

        const categories = await Category.find(findObject).sort({ createdAt: -1 });

        res.status(status.OK).json({
            message: messages.CATEGORIES_FETCHED_SUCCESSFULLY,
            count: categories.length,
            categories
        });
    } catch (err) {
        console.error("Get Categories Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// READ Category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(status.NotFound).json({
                message: messages.CATEGORY_NOT_FOUND
            });
        }

        res.status(status.OK).json({
            message: messages.CATEGORIES_FETCHED_SUCCESSFULLY,
            category,
        });
    } catch (err) {
        console.error("Get Category By ID Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// UPDATE Category by ID
exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(status.BadRequest).json({
                message: "Category name is required"
            });
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(status.NotFound).json({
                message: messages.CATEGORY_NOT_FOUND
            });
        }

        res.status(status.OK).json({
            message: messages.CATEGORY_UPDATED_SUCCESSFULLY,
            category
        });
    } catch (err) {
        console.error("Update Category Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// DELETE Category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(status.NotFound).json({
                message: messages.CATEGORY_NOT_FOUND
            });
        }

        res.status(status.OK).json({
            message: messages.CATEGORY_DELETED_SUCCESSFULLY
        });
    } catch (err) {
        console.error("Delete Category Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};
