import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchBar from "./Search";
import MenuBar from "./Menu";

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        href="/"
                        variant="h6"
                        component="a"
                        sx={{
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        Hack-a-friend Blog
                    </Typography>

                    <SearchBar></SearchBar>

                    <MenuBar></MenuBar>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
