import express from "express";

import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
} from "./booking.controller.js";

import { validateBooking, } from "./booking.validation.js";
import { protectAdmin, } from "../../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Public Routes
 */

router.post("/create", validateBooking, createBooking);
/**
 * Admin Routes
 */

router.get("/all", protectAdmin, getAllBookings);

router.patch("/:id/status", protectAdmin, updateBookingStatus);
export default router;