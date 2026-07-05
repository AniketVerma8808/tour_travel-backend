import Booking from "../booking/booking.model.js";
import Inquiry from "../inquiry/inquiry.model.js";
import Review from "../review/review.model.js";
import TravelPackage from "../package/package.model.js";
import Notification from "../notification/notification.model.js";

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

    unreadNotifications,

    recentBookings,
    recentInquiries,
    recentReviews,
    recentNotifications,
  ] = await Promise.all([

    // Booking Stats
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

    // Inquiry Stats
    Inquiry.countDocuments(),

    // Review Stats
    Review.countDocuments(),

    Review.countDocuments({
      status: "approved",
    }),

    // Package Stats
    TravelPackage.countDocuments(),

    TravelPackage.countDocuments({
      status: "active",
    }),

    // Notification Stats
    Notification.countDocuments({
      isRead: false,
    }),

    // Recent Bookings
    Booking.find()
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .select(
        "bookingNumber name phone status createdAt"
      )
      .lean(),

    // Recent Inquiries
    Inquiry.find()
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .lean(),

    // Recent Reviews
    Review.find()
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .lean(),

    // Recent Notifications
    Notification.find()
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

      unreadNotifications,
    },

    recentBookings,
    recentInquiries,
    recentReviews,
    recentNotifications,
  };
};

export default {
  getDashboard,
};