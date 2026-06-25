import express from "express";

import {
    createBanner,
    getAllBanners,
    deleteBanner,
} from "./banner.controller.js";
import { uploadBanner } from "../../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/",
  uploadBanner.single("image"),
  createBanner
);
router.get("/", getAllBanners);
router.delete("/:id", deleteBanner);

export default router;