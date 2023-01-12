import { combineReducers } from "@reduxjs/toolkit";
import {allRoomsReducer} from "./roomReducer";

const reducers = combineReducers({
    // Add reducers here
   allRooms: allRoomsReducer,

});

export default reducers;