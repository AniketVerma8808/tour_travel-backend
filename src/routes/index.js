import express from "express";
import adminRoutes from "../modules/admin/admin.routes.js";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ message: "API Working Fine 🚀" });
});

router.use("/admin", adminRoutes);


export default router;