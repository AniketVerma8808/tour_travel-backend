export const validatePackage = (req, res, next) => {
  const body = req.body || {};

  const { title, category, price, oldPrice } = body;

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

  if (!category || !validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: "Invalid package category",
    });
  }

  if (price === undefined || Number(price) < 0) {
    return res.status(400).json({
      success: false,
      message: "Valid package price is required",
    });
  }

  if (oldPrice && Number(oldPrice) < Number(price)) {
    return res.status(400).json({
      success: false,
      message: "Old price must be greater than current price",
    });
  }

  next();
};

export const validatePackageUpdate = (
  req,
  res,
  next
) => {
  const validCategories = [
    "local-tour",
    "outstation-tour",
    "airport-transfer",
  ];

  if (
    req.body.category &&
    !validCategories.includes(
      req.body.category
    )
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid package category",
    });
  }

  if (
    req.body.price !== undefined &&
    Number(req.body.price) < 0
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Valid package price is required",
    });
  }

  if (
    req.body.oldPrice &&
    req.body.price &&
    Number(req.body.oldPrice) <
      Number(req.body.price)
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Old price must be greater than current price",
    });
  }

  next();
};