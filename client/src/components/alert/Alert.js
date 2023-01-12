import React from "react";
import Loading from "./Loading";
import Backdrop from "@mui/material/Backdrop";
import { useSelector } from "react-redux";
import Toast from "./Toast";
import AlertComponent from "@mui/material/Alert";

export const Alert = () => {
    const { alert } = useSelector((state) => state);
    return (
        <>
            {alert.loading && (
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={true}
                >
                    <Loading></Loading>
                </Backdrop>
            )}
            {alert.errors && (
                <Toast body={alert.errors} bgColor="error"></Toast>
            )}
            {alert.success && (
                <Toast body={alert.success} bgColor="success"></Toast>
            )}
        </>
    );
};

export const showErrMsg = (msg) => {
    return <AlertComponent severity="error">{msg}</AlertComponent>;
};

export const showSuccessMsg = (msg) => {
    return <AlertComponent severity="success">{msg}</AlertComponent>;
};
