import Booking from "../models/booking";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";




// Create new Booking => /api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {

 
    const {
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
    } = req.body;

    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,

    })

    res.status(200).json({
        success: true,
        booking


    })

})


// check room booking => /api/bookings/check

const checkRoomBooking = catchAsyncErrors(async (req, res, next) => {

    let { roomId, checkInDate, checkOutDate } = req.query;

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);
    console.log(roomId, checkInDate, checkOutDate)
    const booking = await Booking.find({
        room: roomId,
        $and: [
            {
                checkInDate: { $lte: checkOutDate },

            },
            {
                checkOutDate: { $gte: checkInDate }
            }
        ]
    })

    // if booking is available
    let isAvailable;

    if (booking && booking.length === 0) {
        isAvailable = true;
    } else {
        isAvailable = false;
    }


    res.status(200).json({
        success: true,
        isAvailable
    })

})

export {
    newBooking,
    checkRoomBooking
}