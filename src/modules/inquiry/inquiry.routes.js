import express from "express";

import {
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
} from "./inquiry.controller.js";

import { validateInquiry } from "./inquiry.validation.js";
import { protectAdmin } from "../../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Public route
 */
router.post("/create", validateInquiry, createInquiry);

/**
 * Admin routes
 */
router.get("/all", protectAdmin, getAllInquiries);

router.patch("/:id/status", protectAdmin, updateInquiryStatus);

export default router;