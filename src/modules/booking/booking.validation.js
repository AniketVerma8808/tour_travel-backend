export const validateBooking = (req, res, next) => {
    const { name, phone, email, travelDate, pickup, drop, numberOfPassengers, } = req.body;

    if (!name?.trim()) {
        return res.status(400).json({
            success: false,
            message: "Name is required",
        });
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phone || !phoneRegex.test(phone.trim())) {
        return res.status(400).json({
            success: false,
            message: "Valid phone number is required",
        });
    }

    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address",
            });
        }
    }

    if (!travelDate) {
        return res.status(400).json({
            success: false,
            message: "Travel date is required",
        });
    }

    const selectedDate = new Date(travelDate);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        return res.status(400).json({
            success: false,
            message: "Travel date cannot be in the past",
        });
    }

    if (!pickup?.trim()) {
        return res.status(400).json({
            success: false,
            message: "Pickup location is required",
        });
    }

    if (!drop?.trim()) {
        return res.status(400).json({
            success: false,
            message: "Drop location is required",
        });
    }

    if (
        numberOfPassengers &&
        (
            Number(numberOfPassengers) < 1 ||
            Number(numberOfPassengers) > 50
        )
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Invalid passenger count",
        });
    }

    next();
};