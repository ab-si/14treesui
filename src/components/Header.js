import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core"
import { Home, Public } from "@material-ui/icons"
import { Link as RouterLink } from "react-router-dom";
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles({
    root: {
      width: '100%',
      margin: 'auto',
      justifyContent: 'center',
      textAlign:'center',
      marginBottom: 18,
    },
    appBar: {
      background: '#ffff',
      boxShadow: "none",
      borderBottom: "1px solid #1F3625"
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
      display: "inline-block",
      float: "right",
      justifyContent: "right",
    },
    title: {
      display: "inline-block",
      float: "left",
      color: "#1F3625",
      fontSize: "36px",
      fontWeight: 700,
      fontStyle: "normal",
      position: "relative",
      top: "30px"
    }

  });

export default function Header(props) {
    const classes = useStyles();
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    }, [open]);
    
    return (
      // <Paper className={classes.root} elevation={3}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>Realtime Impact Dashboard</div>
          <div className={classes.toolbar}>
          <IconButton
            edge="end" color="inherit" aria-label="home" style={{'marginRight':'auto'}}
            component={RouterLink}
            to={'/'}
          >
            <img ALT="14trees" src={`${process.env.PUBLIC_URL}/14trees.svg`} ></img>;
          </IconButton>
      </div>
        </Toolbar>
      </AppBar>
    )
}