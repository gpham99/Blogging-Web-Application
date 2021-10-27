import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import profilepic from '../assets/profilepic.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlertWarning from './Alert';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: 20
    },
    title: {
        height: 50,
        backgroundColor: '#3f51b5',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: '40%',
        maxHeight: 'auto',
        borderRadius: '50%'
    },
    textField: {
        width: '100%',
    },
    infoSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textFields: {
        display: 'flex',
        flexDirection: 'column',
    },
    paper: {
        padding: 30,
    },
}))

const EditProfileSection = ({
    setAlert,
    getCurrentUserProfile,
    editProfile,
    auth: { user }
}) => {
    useEffect (
        () => {
            getCurrentUserProfile();
            setFormData({
                name: user?.name,
                email: user?.email,
                password: '',
                password2: '',
                currentpassword: ''
            });
        }, [user, getCurrentUserProfile]
    )

    const [formData, setFormData] = useState({
        name: '',               
        email: '',
        password: '',
        password2: '',
        currentpassword: ''
    })

    const { name, email, password, password2, currentpassword } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})    

    const onSubmit = async e => {
        try {
        e.preventDefault();
        if (password !== password2){
            setAlert('Passwords do not match', 'error')
            setFormData({
                name: user?.name,
                email: user?.email,
                password: '',
                password2: '',
                currentpassword: ''
            })
        }
        else {
            editProfile({ name, email, password, currentpassword })
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
        }
        catch(err) {
            console.log(err)
        }
    }

    const onClick = async (e) => {
        try {
            e.preventDefault()
            if (window.confirm("Are you sure? You cannot undo this.")) {
                // send an action elsewhere
                // deleteProfile()
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    const classes = useStyles();
    
    return (
    <form onSubmit={e => onSubmit(e)}>
    <Grid container spacing={4} direction="column">
        <Grid item container direction="column" spacing={1}>
            <AlertWarning></AlertWarning>
        </Grid>

        <Grid item>
            <Grid item xs={7} sm={4}>
                <div className={classes.title}>Basic Information</div>
            </Grid>

            <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item className={classes.infoSection} xs={12} sm={4}>
                                <Grid container>
                                    <Grid item>
                                        <img className={classes.img} src={profilepic} alt="Profile Pic"/>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item className={classes.infoSection} xs={12} sm={8}>
                                <Grid container className={classes.textFields} spacing={3}>
                                    <Grid item>
                                    <TextField
                                    size="small"
                                    id="standard-read-only-input"
                                    label="Name"
                                    name="name"
                                    value={name}
                                    className={classes.textField}
                                    onChange={e => onChange(e)}
                                    variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item>
                                    <TextField
                                    size="small"
                                    id="standard-read-only-input"
                                    label="Email Address"
                                    name="email"
                                    value={email}
                                    className={classes.textField}
                                    onChange={e => onChange(e)}
                                    variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item>
                                    <TextField
                                    size="small"
                                    id="standard-read-only-input"
                                    label="Password"
                                    name="password"
                                    value={password}
                                    className={classes.textField}
                                    onChange={e => onChange(e)}
                                    variant="outlined"
                                    helperText="Leave blank if you don't want to change your password."
                                    />
                                    </Grid>

                                    <Grid item>
                                    <TextField
                                    size="small"
                                    id="standard-read-only-input"
                                    label="Password Confirmation"
                                    name="password2"
                                    value={password2}
                                    className={classes.textField}
                                    onChange={e => onChange(e)}
                                    variant="outlined"
                                    />
                                    </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                </Paper>
            </Grid>
        </Grid>

        <Grid item>
            <Grid item xs={7} sm={4}>
                <div className={classes.title}>Password Confirmation</div>
            </Grid>

            <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>
                    <TextField
                    size="small"
                    id="standard-read-only-input"
                    label="Current password"
                    name="currentpassword"
                    value={currentpassword}
                    className={classes.textField}
                    onChange={e => onChange(e)}
                    variant="outlined"
                    helperText="We need your current password if you want to make changes."
                    required
                    />
                </Paper>
            </Grid>
        </Grid>

        <Grid item>
            <Button type="submit" variant="contained" color="primary">Update</Button>
        </Grid>

        <Grid item>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <Typography align="left" fontWeight="fontWeightBold" variant="body1" style={{ fontWeight: 600 }}>
                                Deactivate my account
                            </Typography>
                            <Typography align="left" variant="body2">
                                Not using your account anymore? You can cancel your account here.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Button variant="outlined" color="secondary"
                            onClick={e => onClick(e)}
                            >Delete</Button>
                        </Grid>
                    </Grid>
                </Paper>
        </Grid>
    </Grid>
    </form>
    )
}

export default EditProfileSection