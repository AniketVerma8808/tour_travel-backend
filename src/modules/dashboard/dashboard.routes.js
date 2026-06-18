import express from "express";
import { getDashboard } from "./dashboard.controller.js";
import { protectAdmin } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectAdmin, getDashboard);

export default router;