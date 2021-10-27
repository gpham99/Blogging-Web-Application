import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import post from '../assets/post.jpeg'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        display: 'flex',
        backgroundColor: '#F9F6F6'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '30%',
        maxHeight: 'auto'
    }
}));

export default function MediaControlCard() {
const classes = useStyles();

return (
    <Card className={classes.root}>
        <div className={classes.details}>
        <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
            Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
            </Typography>
        </CardContent>

        </div>
        <CardMedia
        className={classes.cover}
        image={post}
        title="Live from space album cover"
        />
    </Card>
);
}