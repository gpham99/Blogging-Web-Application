import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../components/global/NotFound";
import CreateForm from "../components/cards/CreateForm";
import CardHoriz from "../components/cards/CardHoriz";
import Box from "@mui/material/Box";
import ReactQuill from "../components/editor/ReactQuill";
import Button from "@mui/material/Button";
import { validCreateBlog, shallowEqual } from "../utils/Valid";
import { ALERT } from "../redux/types/alertType";
import { imageUpload } from "../utils/ImageUpload";
import { createBlog, updateBlog } from "../redux/actions/blogAction";
import { getAPI } from "../utils/FetchData";

const CreateBlog = ({ id }) => {
    const initState = {
        user: "",
        title: "",
        content: "",
        description: "",
        thumbnail: "",
        createdAt: new Date().toISOString(),
    };

    // blog sets up the structure for blog
    const [blog, setBlog] = useState(initState);
    // text is pure text without style
    const [text, setText] = useState("");
    // body is used inside quill AND it has styling
    const [body, setBody] = useState("");
    const divRef = useRef(null);

    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [oldData, setOldData] = useState(initState);

    useEffect(() => {
        if (!id) return;
        getAPI(`blog/${id}`)
            .then((res) => {
                setBlog(res.data);
                setBody(res.data.content);
                setOldData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        return () => {
            setBlog(initState);
            setBody("");
            setOldData(initState);
        };
    }, [id]);

    useEffect(() => {
        const div = divRef.current;
        if (!div) return;
        const text = div?.innerText;
        setText(text);
    }, [body]);

    const handleSubmit = async () => {
        if (!auth.access_token) return;

        const check = validCreateBlog({ ...blog, content: text });
        if (check.errLength !== 0) {
            return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
        }

        let newData = { ...blog, content: body + "<p><br></p>" };

        if (id) {
            if (blog.user._id !== auth.user?._id)
                return dispatch({
                    type: ALERT,
                    payload: { errors: "Invalid Authentication." },
                });

            const result = shallowEqual(oldData, newData);
            if (result)
                return dispatch({
                    type: ALERT,
                    payload: { errors: "The data does not change." },
                });
            dispatch(updateBlog(newData, auth.access_token));
        } else {
            dispatch(createBlog(newData, auth.access_token));
        }
    };

    if (!auth.access_token) return <NotFound></NotFound>;
    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: { xs: "center", md: "start" },
                    flexDirection: { xs: "column", md: "row" },
                }}
            >
                <Box
                    sx={{
                        width: { xs: "90%", md: "40%" },
                        backgroundColor: "#f5f5f5",
                        pl: 10,
                        pr: 10,
                        pb: 5,
                        height: "100%",
                    }}
                >
                    <h4>Create</h4>
                    <CreateForm blog={blog} setBlog={setBlog}></CreateForm>
                </Box>

                <Box
                    sx={{
                        width: { xs: "90%", md: "60%" },
                        pl: 10,
                        pr: 10,
                        pb: 5,
                        height: "100%",
                    }}
                >
                    <h4 style={{ color: "white" }}>Preview</h4>
                    <CardHoriz blog={blog}></CardHoriz>
                </Box>
            </Box>

            <Box sx={{ pl: 10, pr: 10, pt: 3, pb: 1 }}>
                <ReactQuill setBody={setBody} body={body}></ReactQuill>
            </Box>

            <Box
                sx={{
                    pl: 10,
                    pr: 10,
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                }}
            >
                <div
                    ref={divRef}
                    dangerouslySetInnerHTML={{ __html: body }}
                    style={{ display: "none" }}
                ></div>

                <Button type="text" sx={{ minHeight: 0, minWidth: 0 }}>
                    <small>{text.length}</small>
                </Button>
            </Box>

            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    onClick={handleSubmit}
                >
                    {id ? "Update Post" : "Create Post"}
                </Button>
            </Box>
        </div>
    );
};

export default CreateBlog;
