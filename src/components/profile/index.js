import React, { useEffect } from "react";
import OverallImpactPage from "../overallIpactPage";
import UserProfilePage from "../userProfilePage";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { useParams } from "react-router";
// import { Fullscreen } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ProfilePage = () => {

  const classes = useStyles();
  const { saplingId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:7000/api/v1/profile?id=${saplingId}`, {
      withCredentials: true
    })
    .then((response) => {
      console.log("response...", response);
    })
  }, [saplingId]);

  return <div className={classes.root}>
    <Grid container spacing={2}>
      <Grid style={{ padding: "60px" }} item xs={6} height="50%" >
          <Paper className={classes.paper}>
            <UserProfilePage></UserProfilePage>
          </Paper>
      </Grid>
      <Grid item xs={6}>
          <Paper className={classes.paper}>
            <OverallImpactPage></OverallImpactPage>
          </Paper>
      </Grid>
    </Grid>
  </div>
}

export default ProfilePage;