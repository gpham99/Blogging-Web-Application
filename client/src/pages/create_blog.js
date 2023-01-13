import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../components/global/NotFound";
import CreateForm from "../components/cards/CreateForm";
import CardHoriz from "../components/cards/CardHoriz";
import Box from "@mui/material/Box";
import ReactQuill from "../components/editor/ReactQuill";
import Button from "@mui/material/Button";

const CreateBlog = () => {
    const initState = {
        user: "",
        title: "",
        content: "",
        description: "",
        thumbnail: "",
        createdAt: new Date().toISOString(),
    };

    const [blog, setBlog] = useState(initState);
    const [body, setBody] = useState("");

    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    if (!auth.access_token) return <NotFound></NotFound>;
    return (
        <div>
            <Box
                sx={{
                    mt: 3,
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
                        backgroundColor: "white",
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
                <ReactQuill setBody={setBody}></ReactQuill>
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
                >
                    Create Post
                </Button>
            </Box>
        </div>
    );
};

export default CreateBlog;
