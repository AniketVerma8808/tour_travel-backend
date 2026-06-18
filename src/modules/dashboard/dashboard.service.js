import Booking from "../booking/booking.model.js";
import Inquiry from "../inquiry/inquiry.model.js";
import Review from "../review/review.model.js";
import TravelPackage from "../package/package.model.js";

const getDashboard = async () => {
  const [
    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,

    totalInquiries,

    totalReviews,
    approvedReviews,

    totalPackages,
    activePackages,

    recentBookings,
    recentInquiries,
    recentReviews,
  ] = await Promise.all([
    Booking.countDocuments(),

    Booking.countDocuments({
      status: "pending",
    }),

    Booking.countDocuments({
      status: "confirmed",
    }),

    Booking.countDocuments({
      status: "completed",
    }),

    Booking.countDocuments({
      status: "cancelled",
    }),

    Inquiry.countDocuments(),

    Review.countDocuments(),

    Review.countDocuments({
      status: "approved",
    }),

    TravelPackage.countDocuments(),

    TravelPackage.countDocuments({
      status: "active",
    }),

    Booking.find()
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .select(
        "bookingNumber name phone status createdAt"
      )
      .lean(),

    Inquiry.find()
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .lean(),

    Review.find()
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .lean(),
  ]);

  return {
    success: true,
    statusCode: 200,

    stats: {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,

      totalInquiries,

      totalReviews,
      approvedReviews,

      totalPackages,
      activePackages,
    },

    recentBookings,
    recentInquiries,
    recentReviews,
  };
};

export default {
  getDashboard,
};