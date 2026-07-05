import Notification from "./notification.model.js";

/**
 * Create Notification
 */
const createNotification = async ({
  title,
  message,
  type,
  referenceId = null,
}) => {
  const notification = await Notification.create({
    title,
    message,
    type,
    referenceId,
  });

  return notification;
};

/**
 * Get All Notifications
 */
const getAllNotifications = async ({
  page = 1,
  limit = 20,
}) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const [notifications, total, unreadCount] =
    await Promise.all([
      Notification.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Notification.countDocuments(),

      Notification.countDocuments({
        isRead: false,
      }),
    ]);

  return {
    success: true,
    statusCode: 200,

    page,
    limit,

    total,

    totalPages: Math.ceil(
      total / limit
    ),

    unreadCount,

    notifications,
  };
};

/**
 * Mark Notification as Read
 */
const markAsRead = async (id) => {
  const notification =
    await Notification.findById(id);

  if (!notification) {
    return {
      success: false,
      statusCode: 404,
      message: "Notification not found",
    };
  }

  if (notification.isRead) {
    return {
      success: true,
      statusCode: 200,
      message: "Notification already read",
    };
  }

  notification.isRead = true;

  await notification.save();

  return {
    success: true,
    statusCode: 200,
    message: "Notification marked as read",
  };
};

/**
 * Mark All Notifications as Read
 */
const markAllAsRead = async () => {
  await Notification.updateMany(
    {
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    }
  );

  return {
    success: true,
    statusCode: 200,
    message:
      "All notifications marked as read",
  };
};

/**
 * Delete Notification
 */
const deleteNotification = async (id) => {
  const notification =
    await Notification.findById(id);

  if (!notification) {
    return {
      success: false,
      statusCode: 404,
      message: "Notification not found",
    };
  }

  await notification.deleteOne();

  return {
    success: true,
    statusCode: 200,
    message:
      "Notification deleted successfully",
  };
};

export default {
  createNotification,
  getAllNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};