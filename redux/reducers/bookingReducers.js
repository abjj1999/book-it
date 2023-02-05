import {
    CHECK_BOOKING_REQUEST,
    CHECK_BOOKING_SUCCESS,
    CHECK_BOOKING_FAIL,
    CHECK_BOOKING_RESET,
    BOOKED_DATES_SUCCESS,
    BOOKED_DATES_FAIL,
    CLEAR_ERRORS
}  from '../contants/bookingConstent'


// Path: redux\reducers\bookingReducers.js

export const ChekBookingReducer = (state = { available: null }, action) => {
    switch (action.type) {
        case CHECK_BOOKING_REQUEST:
            return {
                loading: true,
            };
        case CHECK_BOOKING_SUCCESS:
            return {
                loading: false,
                available: action.payload,
            };
        case CHECK_BOOKING_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CHECK_BOOKING_RESET:
            return {
                loading: false,
                available: null,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

//get booked dates
export const bookedDatesReducer = (state = { dates: [] }, action) => {

    switch (action.type) {
        case BOOKED_DATES_SUCCESS:
            return {
                loading: false,
                dates: action.payload
            }
        case BOOKED_DATES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
            }
        default:
            return state;
    }
};