import Booking from "../models/booking";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

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
        paidAt: Date.now()

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

// check booked dates => /api/bookings/check_booked_dates?roomId=5f1b9ab9f8b4f00e0c1e1e1d
const checkBookedDates = catchAsyncErrors(async (req, res, next) => {
    const { roomId } = req.query;

    const booking = await Booking.find({ room: roomId})

    let bookedDates = [];
    const timeDiff = moment().utcOffset()/60;
    // console.log(timeDiff)
    booking.forEach(booking => {
        const checkInDate = moment(booking.checkInDate).add(timeDiff, 'hours');
        const checkOutDate = moment(booking.checkOutDate).add(timeDiff, 'hours');
        const range = moment.range(moment(checkInDate), moment(checkOutDate));

        const dates = Array.from(range.by('day'));

        bookedDates = bookedDates.concat(dates);
    })

    res.status(200).json({
        success: true,
        bookedDates
    })
})

export {
    newBooking,
    checkRoomBooking,
    checkBookedDates
}