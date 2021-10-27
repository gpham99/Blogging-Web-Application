import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PostIcon from './PostIcon'

const useStyles = makeStyles((theme) => ({
    root: {
    },
    paper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },
    div: {
        height: 50,
        backgroundColor: '#3f51b5',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    
}))

const Info = () => {
    const classes = useStyles();
    return(
        <Grid container className={classes.root}>
            <Grid item xs={5} sm={2}>
                <div className={classes.div}>MY POSTS</div>
            </Grid>

            <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>
                    <PostIcon className={classes.PostIcon}></PostIcon>
                    <PostIcon className={classes.PostIcon}></PostIcon>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Info;