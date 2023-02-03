import axios from "axios";
import {
    CHECK_BOOKING_REQUEST,
    CHECK_BOOKING_SUCCESS,
    CHECK_BOOKING_FAIL,
    CHECK_BOOKING_RESET,
    CLEAR_ERRORS
}  from '../contants/bookingConstent'

export const checkBooking = (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    try {
        dispatch({ type: CHECK_BOOKING_REQUEST });

        let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

        const { data } = await axios.get(link);

        dispatch({
            type: CHECK_BOOKING_SUCCESS,
            payload: data.isAvailable
        })
        console.log(data.isAvailable)
    } catch (error) {
        dispatch({
            type: CHECK_BOOKING_FAIL,
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