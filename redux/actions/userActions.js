import {
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL
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
        dispatch({
            type: REGISTER_FAIL, 
            payload: error.response.data.message
        })
        
    }
}
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },

        }
        
        const { data } = await axios.get('/api/me');
        dispatch({
            type: LOAD_USER_SUCCESS, 
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL, 
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