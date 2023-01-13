import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const CardHoriz = ({ blog }) => {
    return (
        <Card
            sx={{
                display: "flex",
                minHeight: 150,
                maxHeight: 170,
            }}
        >
            {blog.thumbnail && (
                <>
                    {typeof blog.thumbnail === "string" ? (
                        <Link to={`/blog/${blog.id}`}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
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

            <Box sx={{ pl: 2 }}>
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
                        sx={{ pt: 10 }}
                    >
                        {new Date(blog.createdAt).toLocaleString()}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CardHoriz;
