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
          <IconButton
            edge="start" color="inherit" aria-label="home" style={{'marginRight':'auto'}}
            component={RouterLink}
            to={'/'}
          >
            <Home fontSize="large" />
          </IconButton>
          <div>
              <Button
                className={classes.menuButton}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                Upload
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            component={RouterLink}
                            to={'/visitorform'}
                            onClick={handleClose}
                          >
                            Visitor
                          </MenuItem>
                          <MenuItem
                            component={RouterLink}
                            to={'/upload'}
                            onClick={handleClose}
                          >
                            Admin
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          {/* <Button
            className={classes.menuButton}
            component={RouterLink}
            to={'/upload'}
            >
              Upload
          </Button> */}
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