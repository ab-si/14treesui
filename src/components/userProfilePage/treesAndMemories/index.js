import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from "@material-ui/core";
import _ from "lodash";

// import Card from '@material-ui/core/Card';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    clear: "both"
  },
  media: {
    height: "160px",
    paddingTop: '56.25%', // 16:9
  },
  rectangleDistance: {
    paddingLeft: "1% !important"
  },
  rectangleTree: {
    width: "170px",
    height: "320px",
    left: "42px",
    top: "650px",
    paddingTop: '2%',
    background: "#1F3625",
    borderRadius: "16px",
  },
  rectangleMemories: {
    // position: "absolute",
    width: "125px",
    height: "100px",
    // left: "496px",
    // top: "650px",
    // background: url(IMG_9429.jpg);
    borderRadius: "16px"
  },
  memoryContainerHeight: {
    height: "auto",
    paddingLeft: "52px !important",
    paddingTop: "25px !important"
  },
  flex: {
    display: "flex",
  },
  flexWrap: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const TreesAndMemories = (props) => {
  const classes = useStyles();
  const [treesPlanted, setTreesPlanted] = useState([]);
  const [treeMemories, setTreeMemories] = useState([]);

  useEffect(() => {
    const trees = _.cloneDeep(props.trees);
    if(trees) {
      trees.forEach(tree => {
        setTreeMemories([...treeMemories, tree.memories])
        delete tree.memories;
        setTreesPlanted([...treesPlanted, tree]);
      });
    }
  }, [props.trees]);

const renderMemories = (classes) => {
  console.log("tree memories...", treeMemories);
  console.log("tree planted...", treesPlanted);
  return treeMemories.length && treeMemories[0].map((treeMemory) => {
    console.log("tree memory...", treeMemory);
    return <Grid item className={classes.memoryContainerHeight}>
    <Card className={classes.rectangleMemories}>
      <CardMedia
      className={classes.media}
      image={treeMemory}
      title="tree image"
      ></CardMedia>
    </Card>
  </Grid>
  });
};

 const renderTrees = () => {
  return treesPlanted.map((treePlanted) => {
    return <Grid item height="100%" >
    <Card className={classes.rectangleTree}>
      <CardMedia 
      className={classes.media}
      image={treePlanted.image}
      title="tree image"
      ></CardMedia>
    </Card>
  </Grid>
  })
 };

  return <>
  <div style={{ display: "flex" }}>
  <Grid xs={6} style={{ display: "flex", marginTop: "26px", fontWeight: "700", fontSize: "24px" }}>Trees Planted</Grid>
  <Grid xs={6} style={{ display: "flex", marginTop: "26px", fontWeight: "700", fontSize: "24px" }}>Memories</Grid>
  </div>
  <Grid container style={{ marginTop: "20px"}}>
  <Grid spacing={2} xs={6} className={classes.flex} id="grid123">
    {renderTrees()}
    </Grid>
    <Grid spacing={2} xs={6} className={classes.flexWrap} id="grid123">
      {renderMemories(classes)}
    </Grid>
  </Grid>
  </>
}

export default TreesAndMemories;