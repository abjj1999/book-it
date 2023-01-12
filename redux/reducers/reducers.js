import { combineReducers } from "@reduxjs/toolkit";
import {allRoomsReducer, roomDetailsReducer} from "./roomReducer";

const reducers = combineReducers({
    // Add reducers here
   allRooms: allRoomsReducer,
   roomDetails: roomDetailsReducer

});

export default reducers;