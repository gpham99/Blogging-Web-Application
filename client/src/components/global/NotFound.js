import React from "react";
import Box from "@mui/material/Box";

const NotFound = () => {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100vw",
                height: "90vh",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                bottom: 0,
            }}
        >
            <div>404 | Not Found</div>
        </Box>
    );
};

export default NotFound;
