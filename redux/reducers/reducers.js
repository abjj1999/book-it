import { combineReducers } from "@reduxjs/toolkit";
import {allRoomsReducer, roomDetailsReducer} from "./roomReducer";
import {authReducer, forgotPassword, userReducer, loadUserReducer} from "./userReducers";
import {ChekBookingReducer, bookedDatesReducer, BookingsReducer, BookingDetailsReducer} from "./bookingReducers";

const reducers = combineReducers({
    // Add reducers here
   allRooms: allRoomsReducer,
   roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPassword,
    loadedUser: loadUserReducer,
    checkBooking: ChekBookingReducer,
    bookedDates: bookedDatesReducer,
    bookings: BookingsReducer,
    bookingDetails: BookingDetailsReducer


});

export default reducers;