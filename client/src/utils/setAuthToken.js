// a function that takes in the token

// if the token is there, attach it to the header -- as in the token exists in our db, right?

// if not, we'd delete it from the header (?)

import axios from 'axios'

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token
    }
    else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;