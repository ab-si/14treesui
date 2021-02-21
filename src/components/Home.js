import Header from './Header';
import Login from './Login/Login'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import BackupIcon from '@material-ui/icons/Backup';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import UploadData from './UploadData';
import App from './App';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

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

export default function Home({token, setAuth, removeToken}) {
    // const history = useHistory();
    const classes = useStyles();
    const [mainState, setMainState] = React.useState("");

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(false);
    }

    return (
        <div className={classes.root}>
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<BackupIcon />}
                                onClick={() => setMainState("upload")}
                            >
                                Upload data
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                className={classes.button}
                                startIcon={<SearchIcon />}
                                onClick={() => setMainState("search")}
                            >
                                Search trees/Persons
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="large"
                                className={classes.button}
                                startIcon={<ExitToAppIcon/>}
                                onClick={() => logout()}
                            >
                                Logout
                            </Button>
                        </div>
                        {
                            (mainState === "upload" && <UploadData token={token}/>) || (mainState === "search" && <App token={token}/>)
                        }
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}