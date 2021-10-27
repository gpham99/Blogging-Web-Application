import axios from 'axios'
import { GET_PROFILE, PROFILE_ERROR, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL } from './types'
import { setAlert } from './alert'
import { loadUser } from './auth'

// Get current user profile
export const getCurrentUserProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/users/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }
    catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            }
        })
    }
}

// Edit Profile
export const editProfile = ({ name, email, password, currentpassword }) => async dispatch => {
    try {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password, currentpassword})    
        const res = await axios.put('/api/users/update', body, config)
        dispatch(loadUser())
        dispatch({
            type: EDIT_PROFILE_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert("Profile Updated", "success"))
    }
    catch(err) {
        dispatch(loadUser())
        dispatch({
            type: EDIT_PROFILE_FAIL
        })
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => 
                dispatch(
                setAlert(error.msg, 'error')
            ))
        }
    }
}

// Delete Profile
// export const deleteProfile = () => 