import React from "react";
import OverallImpactPage from "../overallIpactPage";
import UserProfilePage from "../userProfilePage";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

  return <div className={classes.root}>
    <Grid container spacing={2}>
      <Grid item xs={6}>
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