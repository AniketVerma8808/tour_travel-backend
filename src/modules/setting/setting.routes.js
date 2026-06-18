import express from "express";

import {
    getSettings,
    updateSettings,
} from "./setting.controller.js";

import {
    protectAdmin,
} from "../../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Get Website Settings
 */
router.get("/", protectAdmin, getSettings);

/**
 * Update Website Settings
 */
router.put("/", protectAdmin, updateSettings);

export default router;