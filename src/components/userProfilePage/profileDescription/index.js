import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from "@material-ui/core";
import { CardBody } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    clear: "both"
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
  },
  treeVisits: {
    width: "131px",
    height: "60px",
    left: "444px",
    top: "412px",
    background: "#1F3625",
    borderRadius: "16.3962px",
    color: "#ffff"
  },
  spanText: {
    position: "relative",
    top: "20px",
    minHeight: "100px",
    alignItems: "center",
  },
  userDetails: {
    fontFamily: "Helvetica Now Display",
    fontStyle: "normal",
    fontWeight: "bold",
    fontWeight: "700",
    fontSize: "30px",
    color: "#1F3625"
  }
}));

const ProfileDescription = ({ profileInfo }) => {
  const classes = useStyles();
  console.log("profileinfo...", profileInfo);
  return <Grid container spacing={2} className="grid123">
    <Grid item xs={4} height="100%" >
      <Card className={classes.root}>
        <CardMedia 
        className={classes.media}
        image={profileInfo.profileImage}
        title="tree image"
        ></CardMedia>
      </Card>
    </Grid>
    <Grid item xs={6} height="100%" >
      <Card className={classes.root}>
        <CardBody >
          <div style={{display: "flex"}}>Name:</div> 
          <div style={{display: "flex"}} className={classes.userDetails}> {profileInfo.name}</div>
          <div style={{display: "flex"}}>Organisation: </div>
          <div style={{display: "flex"}} className={classes.userDetails}>{profileInfo.organisation}</div>
          <div style={{display: "flex", marginTop: "10px"}}>
          <Grid style={{  marginRight: "20px" }} item xs={6} className={classes.treeVisits}><span className={ classes.spanText }>2 Trees planted</span></Grid>
          <Grid item xs={6} className={classes.treeVisits}><span className={ classes.spanText }>2 Visits till date</span></Grid>
          </div>
        </CardBody>
      </Card>
    </Grid>
  </Grid>
}

export default ProfileDescription;