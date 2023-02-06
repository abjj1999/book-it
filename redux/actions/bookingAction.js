import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
    CHECK_BOOKING_REQUEST,
    CHECK_BOOKING_SUCCESS,
    CHECK_BOOKING_FAIL,
    CHECK_BOOKING_RESET,
    BOOKED_DATES_SUCCESS,
    BOOKED_DATES_FAIL,
    MY_BOOKINGS_FAIL,
    MY_BOOKINGS_SUCCESS,
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

export const getBookedDates = (id) => async (dispatch) => {
    try {
        // dispatch({ type: CHECK_BOOKING_REQUEST });


        const {data} = await axios.get(`/api/bookings/check_booked_dates?roomId=${id}`);

        dispatch({
            type: BOOKED_DATES_SUCCESS,
            payload: data.bookedDates
        })

    } catch (error) {
        dispatch({
            type: BOOKED_DATES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const myBookings = (authCookie, req) => async (dispatch) => {
    try {
        const config = {
            headers: {
                cookie: authCookie
            }
        }
        const {origin} = absoluteUrl(req);
        const {data} = await axios.get(`${origin}/api/bookings/me`, config);

        dispatch({
            type: MY_BOOKINGS_SUCCESS,
            payload: data.bookings
        })

    } catch (error) {
        dispatch({
            type: MY_BOOKINGS_FAIL,
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