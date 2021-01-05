import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
      width: '75%',
      marginLeft: 10,
      marginBottom: 5
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function Header() {
    const classes = useStyles();
    
    return (
        <Card className={classes.root} variant="outlined">
        <CardContent>
            <Typography variant="h3" component="h1">
            14 Trees Foundation
            </Typography>
            <Typography variant="h5" component="h4">
            14 Trees Foundation is a charitable organization dedicated to building sustainable, carbon-footprint-neutral eco-systems through re-forestation.
            </Typography>
        </CardContent>
        </Card>
    )
}