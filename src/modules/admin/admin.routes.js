import express from "express";
import { loginAdmin } from "./admin.controller.js";
import { validateAdminLogin } from "./admin.validation.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin Route Working",
  });
});


router.post(
  "/login",
  validateAdminLogin,
  loginAdmin
);

export default router;