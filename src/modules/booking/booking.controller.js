import bookingService from "./booking.service.js";

export const createBooking = async (
    req,
    res,
    next
) => {
    try {
        const result =
            await bookingService.createBooking(
                req.body
            );

        return res
            .status(result.statusCode)
            .json(result);
    } catch (error) {
        next(error);
    }
};

export const getAllBookings = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 20,
            search = "",
            status = "",
        } = req.query;

        const result =
            await bookingService.getAllBookings({
                page: Number(page),
                limit: Number(limit),
                search,
                status,
            });

        return res
            .status(result.statusCode)
            .json(result);
    } catch (error) {
        next(error);
    }
};

export const updateBookingStatus = async (req, res, next) => {
    try {
        const result =
            await bookingService.updateBookingStatus(
                req.params.id,
                req.body.status
            );

        return res
            .status(result.statusCode)
            .json(result);
    } catch (error) {
        next(error);
    }
};