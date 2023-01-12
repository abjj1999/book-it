import axios from "axios";
import {
    ALL_ROOMS_SUCCESS, ALL_ROOMS_FAIL, CLEAR_ERRORS
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


// clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}