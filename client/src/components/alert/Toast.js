import React from "react";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { ALERT } from "../../redux/types/alertType";

const Toast = ({ body, bgColor }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(true);

    const handleClose = (e) => {
        dispatch({ type: ALERT, payload: {} });
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                action={action}
            >
                <MuiAlert
                    onClose={handleClose}
                    severity={bgColor}
                    sx={{ width: "100%" }}
                >
                    <div>
                        {typeof body === "string" ? (
                            body
                        ) : (
                            <ul>
                                {body.map((text, index) => (
                                    <li key={index}>{text}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default Toast;
