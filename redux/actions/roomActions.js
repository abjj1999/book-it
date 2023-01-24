import axios from "axios";
import {
    ALL_ROOMS_SUCCESS, ALL_ROOMS_FAIL, CLEAR_ERRORS, ROOM_DETAILS_SUCCESS, ROOM_DETAILS_FAIL
} from '../contants/roomConstants';
import absoluteUrl from "next-absolute-url";

// Get all rooms
export const getRooms =(req, currentPage = 1, location= "", guest, category) => async (dispatch) => {
    try {

        const {origin} = absoluteUrl(req, "localhost:3000");
        let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`

        if(guest) link = link.concat(`&guestCapacity=${guest}`)
        if(category) link = link.concat(`&category=${category}`) 

        const {data} = await axios.get(link);

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