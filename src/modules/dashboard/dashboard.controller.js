import dashboardService from "./dashboard.service.js";

export const getDashboard = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await dashboardService.getDashboard();

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    next(error);
  }
};