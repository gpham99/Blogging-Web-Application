import { ALERT } from "../types/alertType";
import { imageUpload } from "../../utils/ImageUpload";
import { postAPI, getAPI } from "../../utils/FetchData";
import { GET_HOME_BLOGS } from "../types/blogType";

export const createBlog = (blog, token) => async (dispatch) => {
    let url;
    try {
        dispatch({ type: ALERT, payload: { loading: true } });

        if (typeof blog.thumbnail !== "string") {
            const photo = await imageUpload(blog.thumbnail);
            url = photo.url;
        } else {
            url = blog.thumbnail;
        }

        const newBlog = { ...blog, thumbnail: url };

        const res = await postAPI("blog", newBlog, token);
        console.log(res);

        dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
};

export const getHomeBlogs = (search) => async (dispatch) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } });

        let value = search ? search : `?page=${1}`;

        const res = await getAPI(`home/blogs${value}`);
        // console.log(res);

        dispatch({
            type: GET_HOME_BLOGS,
            payload: res.data,
        });

        dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
};
