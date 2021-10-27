import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

// this will only pertain to alert -- an array of objects
const initialState = [] 

export default function alertFunc(state=initialState, action) {
    const { type, payload } = action // destructuring

    switch(type) {
        case SET_ALERT:
            return [...state, payload] // return the array with the payload (the new alert), aka add the alert to the state
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload) // return all alerts except for the one that matches the payload
        default:
            return state     
    }
}