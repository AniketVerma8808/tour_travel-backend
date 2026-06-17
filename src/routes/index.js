import express from "express";

import adminRoutes from "../modules/admin/admin.routes.js";
import inquiryRoutes from "../modules/inquiry/inquiry.routes.js";
import reviewRoutes from "../modules/review/review.routes.js";
import bookingRoutes from "../modules/booking/booking.routes.js";
import packageRoutes from "../modules/package/package.routes.js";

const router = express.Router();

router.get("/health", (req, res) => { res.json({ message: "API Working Fine 🚀" }); });

router.use("/admin", adminRoutes);
router.use("/inquiry", inquiryRoutes);
router.use("/review", reviewRoutes);
router.use("/booking", bookingRoutes);
router.use("/packages", packageRoutes);
export default router;