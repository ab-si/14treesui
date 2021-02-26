import Login from './Login/Login'
import Header from './Header'
import { makeStyles } from '@material-ui/core/styles';
import PrivateRoute from './PrivateRoute';
import React, { useState, useEffect } from 'react';
import App from './App';
import { AuthContext } from "./context/auth";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { CssBaseline } from "@material-ui/core"
import VisitorForm from './Upload/VisitorForm';
import UploadCsv from './Upload/UploadCsv'
import UploadTree from './Upload/UploadTree'
import SelectSearch from './Search/SelectSearch';
import SelectUploadType from './Upload/SelectUploadType';

import api from '../api/local';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      justifyContent: 'center',
      textAlign: 'center',
      minWidth:'1000px'
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
    let [isLoggedIn, setIsLoggedIn] = useState(false);

    const verifyToken = async () => {
        try {
            let res = await api.post('/api/v1/login/verifytoken', {}, {
                headers: {
                    'x-access-token': authTokens 
                  }
            });
            if (res.status===200){
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (authTokens !== null || authTokens !== undefined) {
            verifyToken();
        }
    });

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
                    <Route exact path="/visitorform" component={VisitorForm}/>
                    <PrivateRoute exact path="/selecttype" component={SelectUploadType} />
                    <PrivateRoute exact path="/upload" component={UploadCsv} />
                    <PrivateRoute exact path="/uploadtree" component={UploadTree} />
                    <Route exact path="/search" component={SelectSearch} />
                    <Route exact path="/login" component={Login} />
                </div>
            </div>
        </AuthContext.Provider>
    );
}