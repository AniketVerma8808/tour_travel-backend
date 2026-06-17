export const validateInquiry = (
  req,
  res,
  next
) => {
  const { name, phone } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  if (!phone?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required",
    });
  }

  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(phone.trim())) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number",
    });
  }

  next();
};