import React, { useEffect, useState } from "react";
import OverallImpactPage from "../overallIpactPage";
import UserProfilePage from "../userProfilePage";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { useParams } from "react-router";
import * as Axios from "../../api/local";
import SiteMap from "../siteMap";
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
  const [overallData, setOverallData] = useState({
    ponds: {
      count: 0,
      text: "Ponds created systematically to increase the water table"
    },
    peopleEmployed: {
      count: 0,
      text: "People employed from local Thakar Tribal Community"
    },
    totalPlanted: {
      count: 0,
      totalCount: 100000
    }
  })
  const { saplingId } = useParams();

  useEffect(() => {
    async function fetchData() {

      const response = await Axios.default.get(`/api/v1/profile?id=${saplingId}`);
      if(response.status === 200) {
        setSaplingData(response.data);
      }
    }
    fetchData();

    async function fetchTreeOverall() {
        const overallResponse = await Axios.default.get(`/api/v1/analytics/totaltree`);
        setOverallData({
          ponds: {
            count: 190,
            text: "Ponds created systematically to increase the water table"
          },
          peopleEmployed: {
            count: "100+",
            text: "People employed from local Thakar Tribal Community"
          },
          totalPlanted: {
            count: overallResponse ? overallResponse[0]?.count : 0,
            totalCount: 100000
          }
        })
        console.log("overall response...", overallResponse);
    }
    fetchTreeOverall();
    
  }, [saplingId]);

  return <div className={classes.root}>
    <Grid container spacing={2}>
      <Grid style={{ padding: "60px" }} item xs={6} height="50%" >
          <Paper className={classes.paper}>
            <UserProfilePage saplingData={saplingData}></UserProfilePage>
          </Paper>
      </Grid>
      <Grid style={{ padding: "60px" }} item xs={6} height="50%">
          <Paper className={classes.paper}>
            <OverallImpactPage overallData={overallData}></OverallImpactPage>
          </Paper>
          <div style={{ display: "block"}}>
      <br />
      <SiteMap></SiteMap>
    </div>
      </Grid>
    </Grid>
  </div>
}

export default ProfilePage;