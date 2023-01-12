import React from "react";
import LoginPass from "../components/auth/LoginPass";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Login = () => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 3 }}
            style={{ backgroundColor: "beige" }}
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
