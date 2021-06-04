import { Card } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CardBody, CardFooter, CardText } from "reactstrap";
import LinearProgressWithLabel from "../linearProgressBar";
import SiteMap from "../siteMap";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    clear: "both",
  },
  card: {
    width: "50%",
    height: "185px",
  },
  count: {
    fontWeight: "700",
    fontSize: "60px",
    color: "#9BC53D"
  },
  cardFooter: {
    backgroundColor: "#ffff !important",
    borderTop: "0 !important"
  }
}));

const OverallImpactPage = ({ overallData }) => {
  const classes = useStyles();
  return <div className={classes.root}>
    <span style={{ display: "flex", fontWeight: "700", fontSize: "24px", color: "#1F3625"}}>Overall Impact</span>
    <div style={{ display: "flex", marginTop: "20px", width: "100%", clear: "both"}}>
      <Card className={classes.card}>
        <CardBody style={{ height: "50%"}}>
          <CardText className={classes.count}>{overallData.ponds.count}</CardText>
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <CardText>{overallData.ponds.text}</CardText>
        </CardFooter>
      </Card>
      <Card className={classes.card} style={{ marginLeft: "20px" }}>
        <CardBody style={{ height: "50%"}}>
          <CardText className={classes.count}>{overallData.peopleEmployed.count}</CardText>
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <CardText>{overallData.peopleEmployed.text}</CardText>
        </CardFooter>
      </Card>
      <div style={{ marginLeft: "50px", marginTop: "45px", width: "30%", position: "relative", right: "30px"  }}>
        <span style={{ float: "left", fontSize: "14px", color: "black"}}>Trees planted till date.</span><br />
        <span style={{ fontSize: "31px", color: "#9BC53D", fontWeight: "700", float: "left", width: "100%"}}>20,560/100,000</span>
        <span style={{ marginTop: "20px" }}><LinearProgressWithLabel value={40} /></span>
      </div>
    </div>
  </div>
}

export default OverallImpactPage;