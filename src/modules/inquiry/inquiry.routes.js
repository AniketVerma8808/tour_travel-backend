import express from "express";

import {
  createInquiry,
  getAllInquiries,
} from "./inquiry.controller.js";

import {
  validateInquiry,
} from "./inquiry.validation.js";

import {
  protectAdmin,
} from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  validateInquiry,
  createInquiry
);

router.get(
  "/all",
  protectAdmin,
  getAllInquiries
);

export default router;