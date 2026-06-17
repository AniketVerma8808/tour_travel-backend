import express from "express";

import {
  createReview,
  getApprovedReviews,
  getAllReviews,
  updateReviewStatus,
} from "./review.controller.js";

import {
  validateReview,
} from "./review.validation.js";

import {
  protectAdmin,
} from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  validateReview,
  createReview
);

router.get(
  "/approved",
  getApprovedReviews
);

router.get(
  "/all",
  protectAdmin,
  getAllReviews
);

router.patch(
  "/:id/status",
  protectAdmin,
  updateReviewStatus
);

export default router;