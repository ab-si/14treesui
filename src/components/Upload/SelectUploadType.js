import React from 'react';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { CardContent, CardMedia } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';

const useStyles = makeStyles({
    root: {
        display: 'inline-flex',
        marginTop: '10%',
    },
    card: {
        minHeight: 340,
        minWidth: 340,
        margin: 'auto',
        marginRight: '10vw',
        marginLeft: '10vw',
    },
    media: {
        height: 170,
        backgroundColor: "#fff176"
    },
    content: {
        height: 170,
        marginTop: '20px'
    },
    button :{
        justifyContent: 'center'
    }
});
export default function SelectUploadType() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        title="csv">
                            <InsertDriveFileIcon style={{ fontSize: 160, color:'#707070' }}/>
                    </CardMedia>
                    <Divider orientation="horizontal"/>
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Use this tool to upload CSV file
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            14 Trees Foundation is a charitable organization
                            dedicated to building sustainable, carbon-footprint-neutral
                            eco-systems through re-forestation
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.button}>
                        <Button
                            size="large"
                            color="secondary"
                            component={RouterLink}
                            to={'/upload'}
                        >
                        Upload File
                        </Button>
                    </CardActions>
                </CardActionArea>
            </Card>
            <Divider orientation="vertical" flexItem />
            <Card className={classes.card}>
                <CardActionArea>
                    <CardActions className={classes.button}>
                        <Button
                            size="large"
                            color="secondary"
                            component={RouterLink}
                            to={'/uploadtree'}
                        >
                            Fill Form
                        </Button>
                    </CardActions>
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Use this tool to fill form
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            14 Trees Foundation is a charitable organization
                            dedicated to building sustainable, carbon-footprint-neutral
                            eco-systems through re-forestation
                        </Typography>
                    </CardContent>
                    <Divider orientation="horizontal"/>
                    <CardMedia
                        className={classes.media}
                        title="csv">
                            <VerticalSplitIcon style={{ fontSize: 160, color:'#707070', marginBottom:0 }}/>
                    </CardMedia>
                </CardActionArea>
            </Card>
        </div>
    )
}