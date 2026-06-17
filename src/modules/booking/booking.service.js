import Booking from "./booking.model.js";
import {
  generateBookingNumber,
} from "./booking.helper.js";

const createBooking = async (data) => {
  const phone =
    data.phone?.trim();

  const pickup =
    data.pickup?.trim();

  const drop =
    data.drop?.trim();

  const duplicateBooking =
    await Booking.findOne({
      phone,
      travelDate:
        new Date(
          data.travelDate
        ),
      pickup,
      drop,
    });

  if (duplicateBooking) {
    return {
      success: false,
      statusCode: 409,
      message:
        "Similar booking already exists",
    };
  }

  const bookingNumber =
    await generateBookingNumber();

  const booking =
    await Booking.create({
      bookingNumber,

      name:
        data.name?.trim(),

      phone,

      email:
        data.email
          ?.trim()
          ?.toLowerCase() ||
        null,

      travelDate:
        data.travelDate,

      pickup,

      drop,

      vehicle:
        data.vehicle?.trim() ||
        "",

      packageName:
        data.packageName?.trim() ||
        "",

      numberOfPassengers:
        data.numberOfPassengers ||
        null,

      customerMessage:
        data.customerMessage?.trim() ||
        "",

      statusHistory: [
        {
          status: "pending",
        },
      ],
    });

  return {
    success: true,
    statusCode: 201,
    message:
      "Booking submitted successfully",
    booking: {
      id: booking._id,
      bookingNumber:
        booking.bookingNumber,
    },
  };
};

const getAllBookings =
  async ({
    page = 1,
    limit = 20,
    search = "",
    status = "",
  }) => {
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
      ];
    }

    const skip =
      (page - 1) * limit;

    const [
      bookings,
      total,
    ] =
      await Promise.all([
        Booking.find(query)
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        Booking.countDocuments(
          query
        ),
      ]);

    return {
      success: true,
      statusCode: 200,
      page,
      limit,
      total,
      totalPages:
        Math.ceil(
          total / limit
        ),
      bookings,
    };
  };

const updateBookingStatus =
  async (
    id,
    status
  ) => {
    const allowedStatuses = [
      "pending",
      "confirmed",
      "completed",
      "cancelled",
    ];

    if (
      !allowedStatuses.includes(
        status
      )
    ) {
      return {
        success: false,
        statusCode: 400,
        message:
          "Invalid status",
      };
    }

    const booking =
      await Booking.findById(id);

    if (!booking) {
      return {
        success: false,
        statusCode: 404,
        message:
          "Booking not found",
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

    booking.status =
      status;

    booking.statusHistory.push(
      {
        status,
      }
    );

    await booking.save();

    return {
      success: true,
      statusCode: 200,
      message:
        "Booking status updated",
    };
  };

export default {
  createBooking,
  getAllBookings,
  updateBookingStatus,
};