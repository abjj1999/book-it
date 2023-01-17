import { combineReducers } from "@reduxjs/toolkit";
import {allRoomsReducer, roomDetailsReducer} from "./roomReducer";
import {authReducer, userReducer} from "./userReducers";

const reducers = combineReducers({
    // Add reducers here
   allRooms: allRoomsReducer,
   roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer

});

export default reducers;