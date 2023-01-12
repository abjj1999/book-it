import axios from "axios";
import {
    ALL_ROOMS_SUCCESS, ALL_ROOMS_FAIL, CLEAR_ERRORS, ROOM_DETAILS_SUCCESS, ROOM_DETAILS_FAIL
} from '../contants/roomConstants';
import absoluteUrl from "next-absolute-url";

// Get all rooms
export const getRooms =(req) => async (dispatch) => {
    try {

        const {origin} = absoluteUrl(req, "localhost:3000");

        const {data} = await axios.get(`${origin}/api/rooms`);

        dispatch({
            type: ALL_ROOMS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_ROOMS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getRoomDetails =(req, id) => async (dispatch) => {
    try {

        const {origin} = absoluteUrl(req, "localhost:3000");

        const {data} = await axios.get(`${origin}/api/rooms/${id}`);

        dispatch({
            type: ROOM_DETAILS_SUCCESS,
            payload: data.room
        })
        
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}