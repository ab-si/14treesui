import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import api from '../api/local';
import UploadData from './UploadData';
import App from './App';

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
    }
  }));

export default function Home() {
    const classes = useStyles();
    const [mainState, setMainState] = React.useState("");

    return (
        <div>
            <div className={classes.root}>
                <Header />
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SearchIcon />}
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
            </div>
            {
                (mainState === "upload" && <UploadData />) || (mainState === "search" && <App />)
            }
        </div>
    );
}