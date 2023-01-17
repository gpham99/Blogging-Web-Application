import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DisplayBlog = ({ blog }) => {
    return (
        <Box
            sx={{
                backgroundColor: "#f5f5f5",
                p: 10,
                pl: { sm: 10, md: 20 },
                pr: { sm: 10, md: 20 },
            }}
        >
            <Box style={{ wordWrap: "break-word" }}>
                <Typography align="center" variant="h3">
                    {blog.title}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    mt: 2,
                    color: "blue",
                    fontStyle: "italic",
                }}
            >
                <small>
                    <Typography>
                        {typeof blog.user !== "string" &&
                            `By: ${blog.user.name}`}
                    </Typography>
                </small>

                <small>
                    <Typography>
                        {new Date(blog.createdAt).toLocaleString()}
                    </Typography>
                </small>
            </Box>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </Box>
    );
};

export default DisplayBlog;
