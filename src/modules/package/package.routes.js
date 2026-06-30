import express from "express";
import {
  createPackage,
  getActivePackages,
  getAllPackages,
  getPackageBySlug,
  getPackageById,
  updatePackage,
  updatePackageStatus,
  deletePackage,
} from "./package.controller.js";
import {
  validatePackage,
  validatePackageUpdate,
} from "./package.validation.js";
import { protectAdmin } from "../../middleware/auth.middleware.js";
import { uploadPackage } from "../../middleware/packageUpload.middleware.js";

const router = express.Router();

// Public Packages
router.get("/", getActivePackages);

// Admin Packages
router.get("/all", protectAdmin, getAllPackages);

// Get Package By ID (Admin Edit)
router.get("/details/:id", protectAdmin, getPackageById);

// Get Package By Slug (Public)
router.get("/:slug", getPackageBySlug);

// Create Package
router.post("/create", protectAdmin, uploadPackage.single("image"), validatePackage, createPackage);

// Update Package
router.put("/:id", protectAdmin, validatePackageUpdate, uploadPackage.single("image"), updatePackage);

// Change Status
router.patch("/:id/status", protectAdmin, updatePackageStatus);

// Delete Package
router.delete("/:id", protectAdmin, deletePackage);

export default router;