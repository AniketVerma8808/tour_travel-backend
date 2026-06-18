import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
      index: true,
    },

    travelDate: {
      type: Date,
      required: true,
      index: true,
    },

    pickup: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    drop: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    vehicle: {
      type: String,
      trim: true,
      default: "",
    },

    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TravelPackage",
      default: null,
      index: true,
    },

    packageSnapshot: {
      title: {
        type: String,
        default: "",
      },

      price: {
        type: Number,
        default: null,
      },

      oldPrice: {
        type: Number,
        default: null,
      },

      vehicle: {
        type: String,
        default: "",
      },
    },

    numberOfPassengers: {
      type: Number,
      min: 1,
      default: null,
    },

    customerMessage: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },

    statusHistory: [
      {
        status: {
          type: String,
          required: true,
        },

        updatedAt: {
          type: Date,
          default: Date.now,
        },

        updatedBy: {
          type: String,
          default: "System",
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookingSchema.index({
  status: 1,
  createdAt: -1,
});

bookingSchema.index({
  phone: 1,
  createdAt: -1,
});

bookingSchema.index({
  travelDate: 1,
});

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

export default Booking;