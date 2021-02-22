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
import App from './App';
import { AuthContext } from "./context/auth";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: 15,
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

    const setTokens = (data) => {
        localStorage.setItem("token", data);
        setAuthTokens(data);
    }

    const removeTokens = () => {
        localStorage.removeItem("token")
        setAuthTokens();
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <div className={classes.root}>
                <Header />
                <Router>
                    <div>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<BackupIcon />}
                                component={Link}
                                to={'/upload'}
                            >
                                Upload data
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                className={classes.button}
                                startIcon={<SearchIcon />}
                                component={Link}
                                to={'/search'}
                            >
                                Search Tree/Person
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="large"
                                className={classes.button}
                                startIcon={<ExitToAppIcon/>}
                                onClick={() => removeTokens()}
                            >
                                Logout
                            </Button>
                        </div>
                    <PrivateRoute exact path="/upload" component={UploadData} />
                    <Route exact path="/search" component={App} />
                    <Route exact path="/login" component={Login} />
                    </div>
                </Router>
            </div>
        </AuthContext.Provider>
    );
}