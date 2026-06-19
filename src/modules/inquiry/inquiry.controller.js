import inquiryService from "./inquiry.service.js";

/**
 * Create Inquiry
 */
export const createInquiry = async (req, res, next) => {
  try {
    const result = await inquiryService.createInquiry(req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Inquiries
 */
export const getAllInquiries = async (req, res, next) => {
  try {
    const result = await inquiryService.getAllInquiries();

    return res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Update Inquiry Status
 */
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const result = await inquiryService.updateInquiryStatus(
      req.params.id,
      status
    );

    return res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};