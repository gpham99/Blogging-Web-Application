import { Dispatch } from "redux";
import { ALERT } from "../types/alertType";
import { checkImage, imageUpload } from "../../utils/ImageUpload";

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
            console.log(photo);
        }
        dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
};
