import adminService from "./admin.service.js";

export const loginAdmin = async (req, res, next) => {
  try {
    const result = await adminService.login(req.body);

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    next(error);
  }
};