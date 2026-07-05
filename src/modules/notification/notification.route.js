import express from "express";

import {
    getAllNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} from "./notification.controller.js";

import {
    protectAdmin,
} from "../../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Admin Routes
 */

// Get all notifications
router.get(
    "/all",
    protectAdmin,
    getAllNotifications
);

// Mark single notification as read
router.patch(
    "/:id/read",
    protectAdmin,
    markAsRead
);

// Mark all notifications as read
router.patch(
    "/read-all",
    protectAdmin,
    markAllAsRead
);

// Delete notification
router.delete(
    "/:id",
    protectAdmin,
    deleteNotification
);

export default router;