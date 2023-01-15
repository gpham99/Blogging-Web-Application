import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import homeBlogs from "./homeBlogsReducer";

export default combineReducers({
    auth,
    alert,
    homeBlogs,
});
