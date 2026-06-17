import inquiryService from "./inquiry.service.js";

export const createInquiry = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await inquiryService.createInquiry(
        req.body
      );

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllInquiries = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await inquiryService.getAllInquiries();

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    next(error);
  }
};