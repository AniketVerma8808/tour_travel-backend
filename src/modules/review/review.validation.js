export const validateReview = (
  req,
  res,
  next
) => {
  const {
    name,
    city,
    rating,
    review,
  } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  if (!city?.trim()) {
    return res.status(400).json({
      success: false,
      message: "City is required",
    });
  }

  if (
    !rating ||
    rating < 1 ||
    rating > 5
  ) {
    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5",
    });
  }

  if (!review?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Review is required",
    });
  }

  next();
};