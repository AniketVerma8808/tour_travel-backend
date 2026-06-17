import Review from "./review.model.js";

const createReview = async (data) => {
  const existingReview =
    await Review.findOne({
      name: data.name?.trim(),
      city: data.city?.trim(),
      createdAt: {
        $gte: new Date(
          Date.now() -
            24 * 60 * 60 * 1000
        ),
      },
    });

  if (existingReview) {
    return {
      success: false,
      statusCode: 429,
      message:
        "You have already submitted a review recently",
    };
  }

  await Review.create({
    name: data.name?.trim(),
    city: data.city?.trim(),
    rating: Number(data.rating),
    review: data.review?.trim(),
  });

  return {
    success: true,
    statusCode: 201,
    message:
      "Review submitted successfully and awaiting approval",
  };
};

const getApprovedReviews =
  async () => {
    const reviews =
      await Review.find({
        status: "approved",
      })
        .select(
          "name city rating review createdAt"
        )
        .sort({
          createdAt: -1,
        });

    return {
      success: true,
      statusCode: 200,
      reviews,
    };
  };

const getAllReviews = async () => {
  const reviews = await Review.find()
    .sort({
      createdAt: -1,
    });

  return {
    success: true,
    statusCode: 200,
    count: reviews.length,
    reviews,
  };
};

const updateReviewStatus = async (
  id,
  status
) => {
  const allowedStatuses = [
    "pending",
    "approved",
    "rejected",
  ];

  if (
    !allowedStatuses.includes(status)
  ) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid status",
    };
  }

  const review =
    await Review.findById(id);

  if (!review) {
    return {
      success: false,
      statusCode: 404,
      message: "Review not found",
    };
  }

  review.status = status;

  await review.save();

  return {
    success: true,
    statusCode: 200,
    message:
      "Review status updated successfully",
  };
};

export default {
  createReview,
  getApprovedReviews,
  getAllReviews,
  updateReviewStatus,
};