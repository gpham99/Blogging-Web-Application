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
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth'
import PropTypes from 'prop-types';
import AlertWarning from '../layout/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: 'green',
        padding: 30,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = ({ setAlert, register, isAuthenticated }) => {
    const classes = useStyles();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()

        // if statement over here
        if (password !== password2){
            setAlert('Passwords do not match', 'error')
        }
        else {
            // console.log(formData)
            register({ name, email, password })
        }
    }

    // Redirect
    if ( isAuthenticated ) {
        if ( isAuthenticated ) {
            return < Redirect to="/login" />
        }
    }

    return (
    <Container component="main" maxWidth="xs" className={classes.root}>
        <CssBaseline />

        <div className={classes.paper}>
            <AlertWarning></AlertWarning>
    
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>

            <form className={classes.form} onSubmit={e => onSubmit(e)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="name"
                        name="name"
                        variant="outlined"
                        // required
                        fullWidth
                        id="name"
                        label="Full Name"
                        autoFocus
                        value={name}
                        onChange = {e => onChange(e)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        // required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange = {e => onChange(e)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange = {e => onChange(e)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        fullWidth
                        name="password2"
                        label="Repeat Password"
                        type="password"
                        id="password2"
                        value={password2}
                        onChange = {e => onChange(e)}
                        />
                    </Grid>
                </Grid>

                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Sign Up
                </Button>
                <Grid container justify="flex-end">
                <Grid item>
                    <Link to="/login" variant="body2">
                        Already have an account? Log in
                    </Link>
                </Grid>
                </Grid>
            </form>
        </div>
    </Container>
    );
}

SignUp.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })( SignUp )