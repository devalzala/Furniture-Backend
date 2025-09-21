const Review = require("../models/reviewSchema");
const { status, messages } = require("../utils/index");

// CREATE - Create a new Review
exports.createReview = async (req, res) => {
    try {
        const { productId, userId, name, email, message } = req.body;

        if (!productId || !userId || !name || !email || !message) {
            return res.status(status.BadRequest).json({
                message: "productId, userId, name, email, and message are required"
            });
        }

        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => fileToBase64(file));
        }

        const review = new Review({
            productId,
            userId,
            name,
            email,
            message,
            images
        });

        await review.save();

        res.status(status.OK).json({
            message: messages.REVIEW_CREATED_SUCCESSFULLY,
            review
        });
    } catch (err) {
        console.error("Create Review Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// READ - Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });

        res.status(status.OK).json({
            message: messages.REVIEWS_FETCHED_SUCCESSFULLY,
            count: reviews.length,
            reviews
        });
    } catch (err) {
        console.error("Get All Reviews Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// READ - Get reviews by Product ID
exports.getReviewsByProductId = async (req, res) => {
    try {
        const { productId } = req.query;

        if (!productId) {
            return res.status(status.BadRequest).json({ message: "productId is required" });
        }

        const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

        if (!reviews || reviews.length === 0) {
            return res.status(status.NotFound).json({ message: messages.REVIEW_NOT_FOUND });
        }

        res.status(status.OK).json({
            message: messages.REVIEWS_FETCHED_SUCCESSFULLY,
            count: reviews.length,
            reviews
        });
    } catch (err) {
        console.error("Get Reviews By ProductId Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// UPDATE - Update Review by ID
exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => fileToBase64(file));
        }

        const review = await Review.findByIdAndUpdate(id, { $set: updateData }, { new: true });

        if (!review) {
            return res.status(status.NotFound).json({ message: messages.REVIEW_NOT_FOUND });
        }

        res.status(status.OK).json({
            message: messages.REVIEW_UPDATED_SUCCESSFULLY,
            review
        });
    } catch (err) {
        console.error("Update Review Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// DELETE - Delete Review by ID
exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(status.NotFound).json({ message: messages.REVIEW_NOT_FOUND });
        }

        res.status(status.OK).json({
            message: messages.REVIEW_DELETED_SUCCESSFULLY
        });
    } catch (err) {
        console.error("Delete Review Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// Helper function to convert file to base64
const fs = require("fs");
function fileToBase64(file) {
    const fileData = fs.readFileSync(file.path);
    const base64 = fileData.toString("base64");
    fs.unlinkSync(file.path); // Remove temp file
    return base64;
}
