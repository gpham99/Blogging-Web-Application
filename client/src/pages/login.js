import React, { useEffect } from "react";
import LoginPass from "../components/auth/LoginPass";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const { auth } = useSelector((state) => state);

    useEffect(() => {
        if (auth.access_token) {
            navigate("/");
        }
    }, [auth.access_token, navigate]);

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 3 }}
            style={{ backgroundColor: "#f5f5f5" }}
        >
            <Grid item p={3}>
                <Typography variant="h5" align="center">
                    Have an account? Log in
                </Typography>
            </Grid>

            <Grid item p={3}>
                <LoginPass></LoginPass>
            </Grid>

            <Grid
                item
                container
                spacing={3}
                p={3}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <Link to="#" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>

                <Grid item>
                    No account?{" "}
                    <Link to="/register" variant="body2">
                        Register
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;
