import { ALERT } from "../types/alertType";
import { AUTH } from "../types/authType";
import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { patchAPI, getAPI } from "../../utils/FetchData";
import { checkPassword } from "../../utils/Valid";
import { GET_OTHER_INFO } from "../types/profileType";

export const updateUser = (avatar, name, auth) => async (dispatch) => {
    console.log({ avatar, name, auth });
    if (!auth.access_token || !auth.user) return;
    let url = "";
    try {
        dispatch({ type: ALERT, payload: { loading: true } });
        if (avatar) {
            const check = checkImage(avatar);
            if (check) {
                return dispatch({
                    type: ALERT,
                    payload: { errors: check },
                });
            }

            const photo = await imageUpload(avatar);
            url = photo.url;
        }

        dispatch({
            type: AUTH,
            payload: {
                access_token: auth.access_token,
                user: {
                    ...auth.user,
                    avatar: url ? url : auth.user.avatar,
                    name: name ? name : auth.user.name,
                },
            },
        });

        const res = await patchAPI(
            "user",
            {
                avatar: url ? url : auth.user.avatar,
                name: name ? name : auth.user.name,
            },
            auth.access_token
        );

        dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
};

export const resetPassword =
    (password, cf_password, token) => async (dispatch) => {
        const msg = checkPassword(password, cf_password);
        if (msg)
            return dispatch({
                type: ALERT,
                payload: { errors: msg },
            });
        try {
            dispatch({ type: ALERT, payload: { loading: true } });

            const res = await patchAPI("reset_password", { password }, token);

            dispatch({ type: ALERT, payload: { success: res.data.msg } });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: { errors: err.response.data.msg },
            });
        }
    };

export const getOtherInfo = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await getAPI(`user/${id}`);

        dispatch({
            type: GET_OTHER_INFO,
            payload: res.data,
        });

        dispatch({ type: ALERT, payload: {} });
    } catch (err) {
        dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg },
        });
    }
};
