import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '80vw',
      marginBottom: 10
    },
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
        <div className="search-bar ui raised center aligned"> 
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onFormSubmit}>
                <TextField id="outlined-basic" value={value} label="Search for a Tree/Person" variant="outlined" onChange={handleChange}/>
            </form>
            </div>
    )
}