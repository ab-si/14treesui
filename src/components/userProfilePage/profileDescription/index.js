import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: "320px",
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));

const ProfileDescription = () => {
  const classes = useStyles();

  return <Card className={classes.root}>
    <CardMedia 
    className={classes.media}
    image={`${process.env.PUBLIC_URL}/logo192.png`}
    title="tree image"
    ></CardMedia>
  </Card>
}

export default ProfileDescription;