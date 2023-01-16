import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardVert from "../components/cards/CardVert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Loading from "../components/global/Loading";
import Pagination from "../components/global/Pagination";
import { getHomeBlogs } from "../redux/actions/blogAction";
import { useLocation } from "react-router-dom";

const Home = () => {
    const { homeBlogs } = useSelector((state) => state);
    const { blogs, total } = homeBlogs;

    const dispatch = useDispatch();

    const handlePagination = (num) => {
        const search = `?page=${num}`;
        dispatch(getHomeBlogs(search));
    };

    const location = useLocation();
    const { search } = location;

    useEffect(() => {
        console.log("search: ", search);
        dispatch(getHomeBlogs(search));
    }, []);

    if (!blogs) {
        return <Loading></Loading>;
    }

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
            <h3>Home Blogs</h3>

            <Grid container spacing={5}>
                {blogs?.map((blog) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <CardVert key={blog._id} blog={blog} />
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

export default Home;
