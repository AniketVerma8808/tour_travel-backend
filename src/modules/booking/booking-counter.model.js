import mongoose from "mongoose";

const bookingCounterSchema =
  new mongoose.Schema(
    {
      date: {
        type: String,
        required: true,
        unique: true,
      },

      sequence: {
        type: Number,
        default: 0,
      },
    },
    {
      versionKey: false,
    }
  );

const BookingCounter =
  mongoose.model(
    "BookingCounter",
    bookingCounterSchema
  );

export default BookingCounter;