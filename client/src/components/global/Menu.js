import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const MenuBar = () => {
    const bfLoginLinks = [
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
    ];

    // All the things below are for the dropdown menu.
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button color="inherit" onClick={handleClick}>
                Dashboard
            </Button>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {bfLoginLinks.map((link, index) => (
                    <MenuItem key={index} component={Link} to={link.path}>
                        {link.label}
                    </MenuItem>
                ))}

                <MenuItem component={Link} to="/profile">
                    Profile
                </MenuItem>
                <MenuItem component={Link} to="/">
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

export default MenuBar;
