const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    createReview,
    getAllReviews,
    getReviewsByProductId,
    updateReview,
    deleteReview
} = require("../controllers/reviewController");

// Multer setup for image uploads
const upload = multer({ dest: "uploads/" });

// CREATE Review
router.post("/create", upload.array("images", 5), createReview);

// GET All Reviews
router.get("/all", getAllReviews);

// GET Reviews by Product ID
router.get("/reviewByProductId", getReviewsByProductId);

// UPDATE Review by ID
router.put("/:id", upload.array("images", 5), updateReview);

// DELETE Review by ID
router.delete("/:id", deleteReview);

module.exports = router;
