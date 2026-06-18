import settingService from "./setting.service.js";

/**
 * Get Settings
 */
export const getSettings = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await settingService.getSettings();

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Create / Update Settings
 */
export const updateSettings = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await settingService.updateSettings(
        req.body
      );

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    next(error);
  }
};