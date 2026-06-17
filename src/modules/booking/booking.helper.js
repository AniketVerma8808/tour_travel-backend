import BookingCounter from "./booking-counter.model.js";

export const generateBookingNumber =
  async () => {
    const now = new Date();

    const year =
      now.getFullYear();

    const month = String(
      now.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      now.getDate()
    ).padStart(2, "0");

    const dateKey =
      `${year}${month}${day}`;

    const counter =
      await BookingCounter.findOneAndUpdate(
        {
          date: dateKey,
        },
        {
          $inc: {
            sequence: 1,
          },
        },
        {
          new: true,
          upsert: true,
        }
      );

    const sequence =
      String(
        counter.sequence
      ).padStart(4, "0");

    return `SKT-${dateKey}-${sequence}`;
  };