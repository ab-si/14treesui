import React from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Autocomplete } from '@material-ui/lab';
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core"
import Image from "../tree.png";
import { Home } from "@material-ui/icons"
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      width: '100%',
      margin: 'auto',
      justifyContent: 'center',
      textAlign:'center',
      marginBottom: 18,
    },
    appBar: {
      background: '#3f3f3f',
    },
    pos: {
      marginBottom: 12,
    },
    logo: {
      maxWidth: '3vw',
      maxHeight: '3vw',
      backgroundColor: 'transparent'
    },
    menuButton: {
      fontWeight: 700,
      size: "18px",
      marginLeft: "38px",
      color:"#ffffff"
    },
    toolbar: {
      display: "flex",
      justifyContent: "center",
    }

  });

export default function Header(props) {
    const classes = useStyles();
    
    return (
      // <Paper className={classes.root} elevation={3}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="home" style={{'marginRight':'auto'}}>
            <Home fontSize="large" />
          </IconButton>
            <Button
              className={classes.menuButton}
              component={RouterLink}
              to={'/upload'}
              >
                Upload
            </Button>
            <Button
              className={classes.menuButton}
              component={RouterLink}
              to={'/search'}
              >
                Search
            </Button>
          { props.isLoggedIn && 
            <Button
              className={classes.menuButton}
              color='secondary'
              variant="contained"
              onClick={() => props.removeTokens()}
              component={RouterLink}
              to={'/login'}
              >
                Log Out
            </Button>
          }
          { !props.isLoggedIn && 
            <Button
              className={classes.menuButton}
              color='primary'
              variant="contained"
              component={RouterLink}
              to={'/login'}
              >
                Log In
            </Button>
          }
        </Toolbar>
        {/* <div className={classes.root}>
          <Card className={classes.title}>
            <CardContent>
                <Typography variant="h3" component="h1">
                14 Trees Foundation
                </Typography>
                <Typography variant="h5" component="h4">
                14 Trees Foundation is a charitable organization dedicated to building sustainable, carbon-footprint-neutral eco-systems through re-forestation.
                </Typography>
            </CardContent>
          </Card>
          {/* </Paper> */}
        {/* </div> */}
      </AppBar>
    )
}