import Booking from "../models/booking";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";




// Create new Booking => /api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {


    const {
        room,
        checkInDate,
        CheckOutDate,
        DaysOfStay,
        amountPaid,
        paymentInfo,
    } = req.body;

    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        CheckOutDate,
        DaysOfStay,
        amountPaid,
        paymentInfo,

    })

    res.status(200).json({
        success: true,
        booking


    })

})

export {
    newBooking
}