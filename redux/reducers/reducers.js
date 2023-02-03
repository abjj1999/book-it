import { combineReducers } from "@reduxjs/toolkit";
import {allRoomsReducer, roomDetailsReducer} from "./roomReducer";
import {authReducer, forgotPassword, userReducer, loadUserReducer} from "./userReducers";
import {ChekBookingReducer} from "./bookingReducers";

const reducers = combineReducers({
    // Add reducers here
   allRooms: allRoomsReducer,
   roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPassword,
    loadedUser: loadUserReducer,
    checkBooking: ChekBookingReducer

});

export default reducers;