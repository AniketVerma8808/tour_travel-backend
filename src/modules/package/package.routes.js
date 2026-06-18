import express from "express";

import {
    createPackage,
    getActivePackages,
    getAllPackages,
    getPackageBySlug,
    updatePackage,
    updatePackageStatus,
    deletePackage,
} from "./package.controller.js";

import { validatePackage } from "./package.validation.js";
import { protectAdmin, } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Active Packages
router.get("/", getActivePackages);

// All Packages
router.get("/all", protectAdmin, getAllPackages);

// Single Package By Slug
router.get("/:slug", getPackageBySlug);

// Create Package
router.post("/create", protectAdmin, validatePackage, createPackage);

// Update Package
router.put("/:id", protectAdmin, validatePackage, updatePackage);

// Change Status
router.patch("/:id/status", protectAdmin, updatePackageStatus);

// Delete Package
router.delete("/:id", protectAdmin, deletePackage);

export default router;