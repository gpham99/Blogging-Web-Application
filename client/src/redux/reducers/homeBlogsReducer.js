import { GET_HOME_BLOGS } from "../types/blogType";

const homeBlogsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_HOME_BLOGS:
            return action.payload;
        default:
            return state;
    }
};

export default homeBlogsReducer;
