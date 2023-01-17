import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getBlogsByUserId } from "../../redux/actions/blogAction";
import Loading from "../global/Loading";
import CardVertProfile from "../cards/CardVertProfile";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "../global/Pagination";

const UserBlogs = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const { blogsUser } = useSelector((state) => state);
    const dispatch = useDispatch();
    const user_id = useParams().slug;
    const [blogs, setBlogs] = useState();
    const [total, setTotal] = useState(0);

    const handlePagination = (num) => {
        const search = `?page=${num}`;
        dispatch(getBlogsByUserId(user_id, search));
    };

    useEffect(() => {
        if (!user_id) return;

        if (blogsUser.every((item) => item.id !== user_id)) {
            dispatch(getBlogsByUserId(user_id, search));
        } else {
            const data = blogsUser.find((item) => item.id === user_id);
            if (!data) return;
            setBlogs(data.blogs);
            setTotal(data.total);
            if (data.search) {
                navigate(data.search);
            }
        }
    }, [user_id, blogsUser, dispatch, search, navigate]);

    if (!blogs) return <Loading></Loading>;
    if (blogs.length === 0)
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f5f5f5",
                    pl: { xs: 5, md: 10 },
                    pr: { xs: 5, md: 10 },
                    pb: 5,
                }}
            >
                <h3>No Blogs</h3>
            </Box>
        );

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
                pl: { xs: 5, md: 10 },
                pr: { xs: 5, md: 10 },
                pb: 5,
            }}
        >
            <h3>User Blogs</h3>

            <Grid container spacing={5}>
                {blogs?.map((blog) => (
                    <Grid key={blog._id} item xs={12} sm={6} md={4}>
                        <CardVertProfile key={blog._id} blog={blog} />
                    </Grid>
                ))}
            </Grid>

            <div style={{ padding: 5, marginTop: 30 }}>
                {total > 1 && (
                    <Pagination total={total} callback={handlePagination} />
                )}
            </div>
        </Box>
    );
};

export default UserBlogs;
