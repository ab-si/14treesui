import React from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Autocomplete } from '@material-ui/lab';


const useStyles = makeStyles({
    root: {
      width: '100%',
      margin: 'auto',
      justifyContent: 'center',
      textAlign:'center',
      marginBottom: 18,
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
      <Paper className={classes.root} elevation={3}>
        <Card>
        <CardContent>
            <Typography variant="h3" component="h1">
            14 Trees Foundation
            </Typography>
            <Typography variant="h5" component="h4">
            14 Trees Foundation is a charitable organization dedicated to building sustainable, carbon-footprint-neutral eco-systems through re-forestation.
            </Typography>
        </CardContent>
        </Card>
        </Paper>
    )
}