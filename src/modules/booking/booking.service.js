import Booking from "./booking.model.js";
import TravelPackage from "../package/package.model.js";
import { generateBookingNumber } from "./booking.helper.js";

/**
 * Create Booking
 */
const createBooking = async (data) => {
  const phone = data.phone?.trim();
  const pickup = data.pickup?.trim();
  const drop = data.drop?.trim();

  const startDate = new Date(data.travelDate);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);

  const duplicateBooking = await Booking.findOne({
    phone,
    pickup,
    drop,
    travelDate: {
      $gte: startDate,
      $lt: endDate,
    },
    status: {
      $ne: "cancelled",
    },
  });

  if (duplicateBooking) {
    return {
      success: false,
      statusCode: 409,
      message: "Similar booking already exists",
    };
  }

  let vehicle = data.vehicle?.trim() || "";
  let packageId = null;
  let packageSnapshot = {
    title: "",
    price: null,
    oldPrice: null,
    vehicle: "",
  };

  if (data.packageId) {
    const travelPackage =
      await TravelPackage.findOne({
        _id: data.packageId,
        status: "active",
      });

    if (!travelPackage) {
      return {
        success: false,
        statusCode: 404,
        message: "Package not found",
      };
    }

    packageId = travelPackage._id;

    vehicle =
      travelPackage.vehicle || vehicle;

    packageSnapshot = {
      title: travelPackage.title,
      price: travelPackage.price,
      oldPrice: travelPackage.oldPrice,
      vehicle: travelPackage.vehicle,
    };
  }

  const bookingNumber =
    await generateBookingNumber();

  const booking = await Booking.create({
    bookingNumber,

    name: data.name?.trim(),

    phone,

    email:
      data.email?.trim()?.toLowerCase() ||
      null,

    travelDate: data.travelDate,

    pickup,

    drop,

    vehicle,

    packageId,

    packageSnapshot,

    numberOfPassengers:
      data.numberOfPassengers
        ? Number(data.numberOfPassengers)
        : null,

    customerMessage:
      data.customerMessage?.trim() || "",

    statusHistory: [
      {
        status: "pending",
        updatedBy: "System",
      },
    ],
  });

  return {
    success: true,
    statusCode: 201,
    message: "Booking submitted successfully",
    booking: {
      id: booking._id,
      bookingNumber:
        booking.bookingNumber,
    },
  };
};

/**
 * Get All Bookings
 */
const getAllBookings = async ({
  page = 1,
  limit = 20,
  search = "",
  status = "",
}) => {
  page = Number(page);
  limit = Number(limit);

  const query = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      {
        bookingNumber: {
          $regex: search,
          $options: "i",
        },
      },
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        phone: {
          $regex: search,
          $options: "i",
        },
      },
      {
        pickup: {
          $regex: search,
          $options: "i",
        },
      },
      {
        drop: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const [bookings, total] =
    await Promise.all([
      Booking.find(query)
        .populate(
          "packageId",
          "title price oldPrice vehicle category"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Booking.countDocuments(query),
    ]);

  return {
    success: true,
    statusCode: 200,
    page,
    limit,
    total,
    totalPages: Math.ceil(
      total / limit
    ),
    bookings,
  };
};

/**
 * Update Booking Status
 */
const updateBookingStatus = async (
  id,
  status,
  updatedBy = "Admin"
) => {
  const allowedStatuses = [
    "pending",
    "confirmed",
    "completed",
    "cancelled",
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

  const booking =
    await Booking.findById(id);

  if (!booking) {
    return {
      success: false,
      statusCode: 404,
      message: "Booking not found",
    };
  }

  if (
    booking.status === status
  ) {
    return {
      success: false,
      statusCode: 400,
      message:
        "Booking already in this status",
    };
  }

  booking.status = status;

  booking.statusHistory.push({
    status,
    updatedBy,
  });

  await booking.save();

  return {
    success: true,
    statusCode: 200,
    message:
      "Booking status updated successfully",
    booking: {
      id: booking._id,
      bookingNumber:
        booking.bookingNumber,
      status:
        booking.status,
    },
  };
};

export default {
  createBooking,
  getAllBookings,
  updateBookingStatus,
};