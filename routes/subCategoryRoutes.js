const express = require("express");
const router = express.Router();
const {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
    getSubCategoryByCatergoryId
} = require("../controllers/subCategoryController");

// CREATE
router.post("/create", createSubCategory);

// READ all
router.get("/all", getAllSubCategories);

// Get SubCategory By Category Id 
router.get("/by-category", getSubCategoryByCatergoryId);

// READ by ID
router.get("/:id", getSubCategoryById);

// UPDATE
router.put("/update/:id", updateSubCategory);

// DELETE
router.delete("/delete/:id", deleteSubCategory);

module.exports = router;
