export const validateSetting = (
  req,
  res,
  next
) => {
  const {
    companyName,
    email,
  } = req.body;

  if (!companyName?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Company name is required",
    });
  }

  if (email) {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }
  }

  next();
};