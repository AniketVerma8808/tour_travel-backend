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
    email: data.email?.trim().toLowerCase() || null,
    message: data.message?.trim() || "",
  });

  return {
    success: true,
    statusCode: 201,
    message: "Inquiry submitted successfully",
    inquiry,
  };
};

const getAllInquiries = async () => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });

  return {
    success: true,
    statusCode: 200,
    count: inquiries.length,
    inquiries,
  };
};

const updateInquiryStatus = async (id, status) => {
  const allowedStatus = ["pending", "contacted", "completed", "cancelled"];


  if (!allowedStatus.includes(status)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid status",
    };
  }

  const inquiry = await Inquiry.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!inquiry) {
    return {
      success: false,
      statusCode: 404,
      message: "Inquiry not found",
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: "Status updated successfully",
    inquiry,
  };
};

export default {
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
};