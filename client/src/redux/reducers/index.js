import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import homeBlogs from "./homeBlogsReducer";
import otherInfo from "./otherInfoReducer";

export default combineReducers({
    auth,
    alert,
    homeBlogs,
    otherInfo,
});
