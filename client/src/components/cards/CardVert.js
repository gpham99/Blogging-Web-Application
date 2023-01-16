import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";

const CardVert = ({ blog }) => {
    return (
        <Card>
            <CardActionArea
                component={Link}
                to={`/blog/${blog._id}`}
                sx={{
                    maxWidth: 345,
                    minHeight: { xs: 350, md: 330 },
                    maxHeight: { xs: 350, md: 330 },
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
                    style={{
                        height: 210,
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
                            flexDirection: "row",
                            justifyContent: "space-between",
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
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardVert;
