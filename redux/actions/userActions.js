import {
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS
} from '../contants/userconstants';
import axios from 'axios';

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },

        }
        
        const { data } = await axios.post('/api/auth/register', userData, config);
        dispatch({
            type: REGISTER_SUCCESS, 
        })
    } catch (error) {
        
    }
}

// clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}