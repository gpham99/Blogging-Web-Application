import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import homeBlogs from "./homeBlogsReducer";
import otherInfo from "./otherInfoReducer";
import blogsUser from "./blogsUserReducer";

export default combineReducers({
    auth,
    alert,
    homeBlogs,
    otherInfo,
    blogsUser,
});
