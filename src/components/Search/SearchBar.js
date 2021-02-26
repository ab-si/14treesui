import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '35vw',
    marginRight: '5vw',
    marginLeft: '5vw',
  },
  input: {
    marginLeft: theme.spacing(3),
    flex: 1,
    height: 50,
  },
  iconButton: {
    padding: 10,
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
        // <div className="search-bar ui raised center">
            <Paper className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder={props.text}
                value={value}
                onChange={handleChange}
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={onFormSubmit}>
                <SearchIcon />
              </IconButton>
            </Paper>
        // </div>
    )
}