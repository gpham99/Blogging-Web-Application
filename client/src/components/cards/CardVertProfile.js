import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CardVertProfile = ({ blog }) => {
    const { auth } = useSelector((state) => state);
    return (
        <Card>
            <CardActionArea
                component={Link}
                to={`/blog/${blog._id}`}
                sx={{
                    minHeight: 400,
                    maxHeight: 400,
                }}
            >
                {typeof blog.thumbnail === "string" && (
                    <CardMedia
                        component="img"
                        height="140"
                        image={blog.thumbnail}
                        alt="thumbnail"
                    />
                )}

                <CardContent
                    sx={{
                        height: 210,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ paddingBottom: 10 }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {blog.title.slice(0, 50) + "..."}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {blog.description.slice(0, 100) + "..."}
                        </Typography>
                    </div>

                    <Typography
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <small>
                            {typeof blog.user !== "string" && (
                                <Link to={`/profile/${blog.user._id}`}>
                                    By: {blog.user.name}
                                </Link>
                            )}
                        </small>

                        <small>
                            {new Date(blog.createdAt).toLocaleString()}
                        </small>

                        {blog.user?._id === auth.user?._id && (
                            <small>
                                <Link to={`/update_blog/${blog._id}`}>
                                    Update
                                </Link>
                            </small>
                        )}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardVertProfile;
