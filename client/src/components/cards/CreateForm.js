import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const CreateForm = ({ blog, setBlog }) => {
    const handleChangeInput = (e) => {
        const { value, name } = e.target;
        setBlog({ ...blog, [name]: value });
    };

    const handleChangeThumbnail = (e) => {
        const target = e.target;
        const files = target.files;
        if (files) {
            const file = files[0];
            setBlog({ ...blog, thumbnail: file });
        }
    };

    return (
        <form>
            <Box>
                <Box sx={{ p: 1 }}>
                    <TextField
                        label="Title"
                        name="title"
                        variant="outlined"
                        value={blog.title}
                        onChange={handleChangeInput}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <Button disabled>
                                    <small>{blog.title.length} / 50</small>
                                </Button>
                            ),
                        }}
                    />
                </Box>

                <Box sx={{ p: 1 }}>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleChangeThumbnail}
                    />
                </Box>

                <Box sx={{ p: 1 }}>
                    <TextField
                        label="Description"
                        name="description"
                        onChange={handleChangeInput}
                        value={blog.description}
                        multiline
                        rows={3}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <Button disabled>
                                    <small>
                                        {blog.description.length} / 200
                                    </small>
                                </Button>
                            ),
                        }}
                    />
                </Box>
            </Box>
        </form>
    );
};

export default CreateForm;
