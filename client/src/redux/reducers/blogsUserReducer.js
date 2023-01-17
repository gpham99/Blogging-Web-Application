import { GET_BLOGS_USER_ID } from "../types/blogType";

const blogsUserReducer = (state = [], action) => {
    switch (action.type) {
        case GET_BLOGS_USER_ID:
            if (state.every((item) => item.id !== action.payload.id)) {
                return [...state, action.payload];
            } else {
                return state.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            }

        default:
            return state;
    }
};

export default blogsUserReducer;
