import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
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
                    Create Your Account
                </Typography>
            </Grid>

            <Grid item p={3}>
                <RegisterForm></RegisterForm>
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
                    Have an account?{" "}
                    <Link to="/login" variant="body2">
                        Log in
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Register;
