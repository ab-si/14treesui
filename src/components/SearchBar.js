import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '60%',
//       marginBottom: 10,
//       justifyContent: "center",
//     },
//   },
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


export default function SearchBar(props) {

    const [value, setValue] = useState("");
    
    const handleChange = e => {
        setValue(e.target.value)
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(value);
    }
    const classes = useStyles();

    return (
        <div className="search-bar ui raised center" style={{'marginLeft':'auto'}}>
            {/* <form className={classes.root} noValidate autoComplete="off" onSubmit={onFormSubmit}>
                <TextField id="outlined-basic" value={value} label="Search for a Tree/Person" variant="outlined" onChange={handleChange}/>
            </form> */}
            {/* 'root' | 'absolute' | 'inset' | 'light' | 'middle' | 'vertical'; */}
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Search for a Tree/Person"
                inputProps={{ 'aria-label': 'Search for a Tree/Person' }}
                value={value}
                onChange={handleChange}
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={onFormSubmit}>
                <SearchIcon />
              </IconButton>
            </Paper>
            <Divider variant="middle"/>
        </div>
    )
}