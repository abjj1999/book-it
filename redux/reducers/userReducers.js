import {
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS
} from '../contants/userconstants';

export const authReducer = (state = {  user: null }, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                loading: true
            }
        case REGISTER_SUCCESS:
            return {
                loading: false,
                success : true,
                
            }
        case REGISTER_FAIL:
            return {
                error: action.payload,
                loading: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}