import notificationService from "./notification.service.js";

/**
 * Get All Notifications
 */
export const getAllNotifications = async (
  req,
  res,
  next
) => {
  try {
    const {
      page = 1,
      limit = 20,
    } = req.query;

    const result =
      await notificationService.getAllNotifications({
        page: Number(page),
        limit: Number(limit),
      });

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Mark Notification as Read
 */
export const markAsRead = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await notificationService.markAsRead(
        req.params.id
      );

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Mark All Notifications as Read
 */
export const markAllAsRead = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await notificationService.markAllAsRead();

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Notification
 */
export const deleteNotification = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await notificationService.deleteNotification(
        req.params.id
      );

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    next(error);
  }
};