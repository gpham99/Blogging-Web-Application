import { postAPI } from "../../utils/FetchData";
import { AUTH } from "../types/authType";
import { ALERT } from "../types/alertType";

export const login = (userLogin) => async (dispatch) => {
    try {
        dispatch({
            type: ALERT,
            payload: { loading: true },
        });
        const res = await postAPI("login", userLogin);
        dispatch({
            type: AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
            },
        });
        dispatch({
            type: ALERT,
            payload: { success: "Login Success!" },
        });
    } catch (err) {
        dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg },
        });
    }
};
