import Login from './Login/Login'
import Header from './Header'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import BackupIcon from '@material-ui/icons/Backup';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PrivateRoute from './PrivateRoute';
import React, { useState } from 'react';
import UploadData from './UploadData';
import Search from './Search';
import App from './App';
import { AuthContext } from "./context/auth";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { CssBaseline } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      justifyContent: 'center',
      textAlign: 'center',
    },
    child: {
        marginTop:50,
        marginRight: 10,
        marginLeft: 10,
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(1),
    },
  }));

export default function Home(props) {
    // const history = useHistory();
    const classes = useStyles();
    const existingTokens = localStorage.getItem("token");
    const [authTokens, setAuthTokens] = useState(existingTokens);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const setTokens = (data) => {
        localStorage.setItem("token", data);
        setAuthTokens(data);
        setIsLoggedIn(true);
    }

    const removeTokens = () => {
        localStorage.removeItem("token")
        setAuthTokens();
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <div className={classes.root}>
                <CssBaseline />
                <Header isLoggedIn={isLoggedIn} removeTokens={removeTokens}/>
                <div>
                    <Route exact path="/" component={App} />
                    <PrivateRoute exact path="/upload" component={UploadData} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/login" component={Login} />
                </div>
            </div>
        </AuthContext.Provider>
    );
}