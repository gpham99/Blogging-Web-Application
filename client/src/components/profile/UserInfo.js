import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../global/NotFound";
import Box from "@mui/material/Box";
import { updateUser, resetPassword } from "../../redux/actions/profileAction";

const UserInfo = () => {
    const initState = {
        name: "",
        account: "",
        avatar: "",
        password: "",
        cf_password: "",
    };
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [user, setUser] = useState(initState);
    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);

    const handleChangeInput = (e) => {
        const { value, name } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleChangeFile = (e) => {
        const target = e.target;
        const files = target.files;
        if (files) {
            const file = files[0];
            setUser({ ...user, avatar: file });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (avatar || name) {
            dispatch(updateUser(avatar, name, auth));
        }
        if (password && auth.access_token) {
            dispatch(resetPassword(password, cf_password, auth.access_token));
        }
    };

    const { name, avatar, password, cf_password } = user;

    if (!auth.user) return <NotFound></NotFound>;

    return (
        <form onSubmit={handleSubmit}>
            <Box
                px={{ xs: "5%", sm: "15%", md: "25%" }}
                sx={{ p: 2, backgroundColor: "#f5f5f5" }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ p: 1 }}>
                        <img
                            width="100px"
                            height="100px"
                            style={{ borderRadius: "50%" }}
                            src={
                                avatar
                                    ? URL.createObjectURL(avatar)
                                    : auth.user.avatar
                            }
                            alt="avatar"
                        ></img>
                    </Box>

                    <Box sx={{ p: 1 }}>
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                        >
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                name="file"
                                id="file_up"
                                onChange={handleChangeFile}
                            />
                            <PhotoCamera />
                        </IconButton>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ p: 1 }}>
                        <TextField
                            name="name"
                            label="Name"
                            fullWidth
                            defaultValue={auth.user.name}
                            onChange={handleChangeInput}
                        />
                    </Box>

                    <Box sx={{ p: 1 }}>
                        <TextField
                            label="Account"
                            name="account"
                            fullWidth
                            defaultValue={auth.user.account}
                            onChange={handleChangeInput}
                            disabled={true}
                        />
                    </Box>

                    <Box sx={{ p: 1 }}>
                        <TextField
                            name="password"
                            label="Password"
                            fullWidth
                            defaultValue={password}
                            onChange={handleChangeInput}
                            type={typePass ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <Button>
                                        <small
                                            onClick={() => {
                                                setTypePass(!typePass);
                                            }}
                                        >
                                            {typePass ? "Hide" : "Show"}
                                        </small>
                                    </Button>
                                ),
                            }}
                        />
                    </Box>

                    <Box sx={{ p: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Confirm Password"
                            name="cf_password"
                            defaultValue={cf_password}
                            type={typeCfPass ? "text" : "password"}
                            onChange={handleChangeInput}
                            InputProps={{
                                endAdornment: (
                                    <Button>
                                        <small
                                            onClick={() => {
                                                setTypeCfPass(!typeCfPass);
                                            }}
                                        >
                                            {typeCfPass ? "Hide" : "Show"}
                                        </small>
                                    </Button>
                                ),
                            }}
                        />
                    </Box>
                </Box>

                <Box>
                    <Box sx={{ p: 1 }}>
                        <Button type="submit" variant="contained">
                            Update
                        </Button>
                    </Box>
                </Box>
            </Box>
        </form>
    );
};

export default UserInfo;
