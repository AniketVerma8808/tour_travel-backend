import Inquiry from "./inquiry.model.js";

const createInquiry = async (data) => {
  const phone = data.phone?.trim();

  const existingInquiry = await Inquiry.findOne({
    phone,
    createdAt: {
      $gte: new Date(Date.now() - 5 * 60 * 1000),
    },
  });

  if (existingInquiry) {
    return {
      success: false,
      statusCode: 429,
      message:
        "Please wait before submitting another inquiry",
    };
  }

  const inquiry = await Inquiry.create({
    name: data.name?.trim(),
    phone,
    email:
      data.email?.trim().toLowerCase() || null,
    message:
      data.message?.trim() || "",
  });

  return {
    success: true,
    statusCode: 201,
    message: "Inquiry submitted successfully",
    inquiry,
  };
};

const getAllInquiries = async () => {
  const inquiries = await Inquiry.find()
    .sort({ createdAt: -1 });

  return {
    success: true,
    statusCode: 200,
    count: inquiries.length,
    inquiries,
  };
};

export default {
  createInquiry,
  getAllInquiries,
};