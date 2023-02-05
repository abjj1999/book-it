import mongoose from "mongoose";
import timeZone from "mongoose-timezone";

const BookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    daysOfStay: {
        type: Number,
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

BookingSchema.plugin(timeZone, { paths: ["checkInDate", "checkOutDate", "paidAt", "createdAt"] });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);