import reviewService from "./review.service.js";

export const createReview = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await reviewService.createReview(
        req.body
      );

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    next(error);
  }
};

export const getApprovedReviews =
  async (req, res, next) => {
    try {
      const result =
        await reviewService.getApprovedReviews();

      return res
        .status(result.statusCode)
        .json(result);
    } catch (error) {
      next(error);
    }
  };

export const getAllReviews = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await reviewService.getAllReviews();

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    next(error);
  }
};

export const updateReviewStatus =
  async (req, res, next) => {
    try {
      const result =
        await reviewService.updateReviewStatus(
          req.params.id,
          req.body.status
        );

      return res
        .status(result.statusCode)
        .json(result);
    } catch (error) {
      next(error);
    }
  };