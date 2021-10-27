import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import AlertWarning from '../layout/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    
    bottomGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

const LogIn = ({ login, isAuthenticated }) => {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }

    // Redirect if logged in
    if ( isAuthenticated ) {
        return <Redirect to="/dashboard" />
        // we havent created dashboard yet
    }


    return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <AlertWarning></AlertWarning>
        <Typography component="h1" variant="h5">
            Log in
        </Typography>

        <form className={classes.form} onSubmit={e => onSubmit(e)}>
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete=""
            autoFocus
            value={email}
            onChange={e => onChange(e)}
            />
            
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => onChange(e)}
            />

            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Sign In
            </Button>

            <Grid container spacing={3} className={classes.bottomGrid}>
                <Grid item>
                    <Link to="#" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>

                <Grid item>
                    <Link to="/signup" variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </form>
        </div>
    </Container>
    );
}

LogIn.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })( LogIn )