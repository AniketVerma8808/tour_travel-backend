import packageService from "./package.service.js";

/**
 * Create Package
 */
export const createPackage = async (req, res, next) => {
    console.log("BODY =>", req.body);
  console.log("FILE =>", req.file);

  try {
    const result = await packageService.createPackage(req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get Active Packages (Public)
 */
export const getActivePackages = async (req, res, next) => {
  try {
    const result = await packageService.getActivePackages();

    return res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Packages (Admin)
 */
export const getAllPackages = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = "",
      status = "",
    } = req.query;

    const result = await packageService.getAllPackages({
      page: Number(page),
      limit: Number(limit),
      search,
      status,
    });

    return res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get Package By Slug
 */
export const getPackageBySlug = async (req, res, next) => {
  try {
    const result = await packageService.getPackageBySlug(
      req.params.slug
    );

    return res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Update Package
 */
export const updatePackage = async (req, res, next) => {
  try {
    const result = await packageService.updatePackage(
      req.params.id,
      req.body
    );

    return res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Update Package Status
 */
export const updatePackageStatus = async (req, res, next) => {
  try {
    const result = await packageService.updatePackageStatus(
      req.params.id,
      req.body.status
    );

    return res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const getPackageById = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await packageService.getPackageById(
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
 * Delete Package
 */
export const deletePackage = async (req, res, next) => {
  try {
    const result = await packageService.deletePackage(req.params.id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};