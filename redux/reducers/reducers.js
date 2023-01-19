import { combineReducers } from "@reduxjs/toolkit";
import {allRoomsReducer, roomDetailsReducer} from "./roomReducer";
import {authReducer, forgotPassword, userReducer} from "./userReducers";

const reducers = combineReducers({
    // Add reducers here
   allRooms: allRoomsReducer,
   roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPassword,

});

export default reducers;