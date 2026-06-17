export const validatePackage = (
  req,
  res,
  next
) => {
  const {
    title,
    category,
    price,
  } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Package title is required",
    });
  }

  const validCategories = [
    "local-tour",
    "outstation-tour",
    "airport-transfer",
  ];

  if (
    !category ||
    !validCategories.includes(category)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid package category",
    });
  }

  if (
    price === undefined ||
    Number(price) < 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Valid package price is required",
    });
  }

  if (
    req.body.oldPrice &&
    Number(req.body.oldPrice) <
      Number(price)
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Old price must be greater than current price",
    });
  }

  next();
};