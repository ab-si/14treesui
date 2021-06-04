import React, { useEffect, useState } from "react";
import OverallImpactPage from "../overallIpactPage";
import UserProfilePage from "../userProfilePage";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { useParams } from "react-router";
import * as Axios from "../../api/local";
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
  const [saplingData, setSaplingData] = useState({
    name: "",
    organisation: "",
    profileImage: ""
  });
  const { saplingId } = useParams();

  useEffect(() => {
    async function fetchData() {

      const response = await Axios.default.get(`/api/v1/profile?id=${saplingId}`);
      console.log("response...", response);
      if(response.status === 200) {
        setSaplingData(response.data);
      }
    }
    fetchData();
    
  }, [saplingId]);

  return <div className={classes.root}>
    <Grid container spacing={2}>
      <Grid style={{ padding: "60px" }} item xs={6} height="50%" >
          <Paper className={classes.paper}>
            <UserProfilePage saplingData={saplingData}></UserProfilePage>
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