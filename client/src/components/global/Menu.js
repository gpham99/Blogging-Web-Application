import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";

const MenuBar = () => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const bfLoginLinks = [
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
    ];

    const afLoginLinks = [
        { label: "Home", path: "/" },
        { label: "Create a blog", path: "/create_blog" },
    ];

    const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks;

    const { pathname } = useLocation();

    // when the path is active, we disable it on the nav bar
    const isActive = (pn) => {
        if (pn === pathname) return true;
    };

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
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            {navLinks.map((link, index) => (
                <MenuItem
                    key={index}
                    component={Link}
                    to={link.path}
                    disabled={isActive(link.path)}
                >
                    {link.label}
                </MenuItem>
            ))}

            {auth.user && (
                <>
                    <Tooltip>
                        <IconButton
                            color="inherit"
                            onClick={handleClick}
                            sx={{ p: 1 }}
                        >
                            <Avatar alt="avatar" src={auth.user.avatar} />
                        </IconButton>
                    </Tooltip>

                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem component={Link} to="/profile">
                            Profile
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/"
                            onClick={() => dispatch(logout())}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </>
            )}
        </Box>
    );
};

export default MenuBar;
