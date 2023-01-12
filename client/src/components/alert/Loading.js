import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Loading = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CircularProgress />
            <Button variant="text" disabled>
                <h5 style={{ color: "white" }}>Loading</h5>
            </Button>
        </Box>
    );
};

export default Loading;
