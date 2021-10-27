import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, EDIT_PROFILE_FAIL, EDIT_PROFILE_SUCCESS } from '../actions/types'

const initialState = {
    profile: null,
    profiles: [], // when we have the lists of users
    loading: true,
    error: {}
}

export default function profileFunc(state =initialState, action) {
    const {type, payload} = action

    // get the profile
    switch(type) {
        case GET_PROFILE:
        case EDIT_PROFILE_SUCCESS:
            return {
            ...state,
            profile: payload,
            loading: false,
            }
        case PROFILE_ERROR:
        case EDIT_PROFILE_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        default:
            return state
    }
}