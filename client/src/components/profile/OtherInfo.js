import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOtherInfo } from "../../redux/actions/profileAction";
import Loading from "../global/Loading";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const OtherInfo = ({ id }) => {
    const [other, setOther] = useState();
    const { otherInfo } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!id) return;

        if (otherInfo.every((user) => user._id !== id)) {
            dispatch(getOtherInfo(id));
        } else {
            const newUser = otherInfo.find((user) => user._id === id);
            if (newUser) setOther(newUser);
        }
    }, [id, otherInfo, dispatch]);

    if (!other) return <Loading></Loading>;
    return (
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
                        src={other.avatar}
                        alt="avatar"
                    ></img>
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
                        label="Name"
                        fullWidth
                        defaultValue={other.name}
                        disabled={true}
                    />
                </Box>

                <Box sx={{ p: 1 }}>
                    <TextField
                        label="Email"
                        fullWidth
                        defaultValue={other.account}
                        disabled={true}
                    />
                </Box>

                <Box sx={{ p: 1 }}>
                    <TextField
                        label="Role"
                        fullWidth
                        defaultValue={
                            other.role.charAt(0).toUpperCase() +
                            other.role.slice(1)
                        }
                        disabled={true}
                    />
                </Box>

                <Box sx={{ p: 1 }}>
                    <TextField
                        label="Join Date"
                        fullWidth
                        defaultValue={new Date(
                            other.createdAt
                        ).toLocaleString()}
                        disabled={true}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default OtherInfo;
