const express = require("express");
const router = express.Router();
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

// Create new category
router.post("/create", createCategory);

// Get all categories
router.get("/", getAllCategories);

// Get category by ID
router.get("/:id", getCategoryById);

// Update category by ID
router.put("/update/:id", updateCategory);

// Delete category by ID
router.delete("/delete/:id", deleteCategory);

module.exports = router;
