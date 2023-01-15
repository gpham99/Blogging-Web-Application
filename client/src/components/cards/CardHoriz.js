import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const CardHoriz = ({ blog }) => {
    return (
        <Card
            sx={{
                display: "flex",
                minHeight: 150,
                maxHeight: 220,
                maxWidth: 500,
            }}
        >
            {blog.thumbnail && (
                <>
                    {typeof blog.thumbnail === "string" ? (
                        <Link to={`/blog/${blog.id}`}>
                            <CardMedia
                                component="img"
                                sx={{ width: 150 }}
                                image={blog.thumbnail}
                                alt="thumbnail"
                            />
                        </Link>
                    ) : (
                        <CardMedia
                            component="img"
                            sx={{ width: 150 }}
                            image={URL.createObjectURL(blog.thumbnail)}
                            alt="thumbnail"
                        />
                    )}
                </>
            )}

            <Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {blog.title}
                    </Typography>
                    <Typography variant="body2">{blog.description}</Typography>
                </CardContent>

                <CardContent>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        gutterBottom
                    >
                        {new Date(blog.createdAt).toLocaleString()}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CardHoriz;
