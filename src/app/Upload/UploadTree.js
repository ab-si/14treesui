import React, {useState, useEffect} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Backdrop from '@material-ui/core/Backdrop';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Button, Paper, Typography, Avatar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import api from '../../api/local';
import { useAuth } from "../context/auth";
import UseStyle from './style';

const intitialFValues = {
    name: '',
    sapling: '',
    location: '',
    date: new Date(),
    uploaded:false,
    loading:false,
    backdropOpen:false,
    locations:[],
}


export default function UploadTree() {
    const { authTokens } = useAuth();
    const classes = UseStyle();
    const [values, setValues] = useState(intitialFValues);
    const [errors, setErrors] = useState({});
    let locations = [];

    const getLocations = () => {
        try {
            api.get('/api/v1/get/locations').then(data => {
                if ( data.status === 200 ) {
                    setValues({
                        ...values,
                        locations: data
                    })
                }
            }).catch(error => {
                console.log(error)
            });
            
            console.log(values.locations)
        } catch (error) {
            console.log(error)
        }
    }
    const reset = () => {
        setValues(intitialFValues)
        setErrors({}) 
    }

    const validate = () => {
        let temp = {};
        temp.name = values.name ? "" : "Required Field"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    const handleInputchange = (e) => {
        const { name, value } = e.target
        validate();
        setValues({
            ...values,
            [name]:value
        })
    }
    const handleDateChange = (value) => {
        setValues({
            ...values,
            date:value
        });
    };

    const handleClose = () => {
        if (!values.loading) {
            setValues({
                ...values,
                backdropOpen:false,
            })
        }
    }

    const onSubmit = (e) => {
        if(!validate()){
            toast.error('Please fill mandatory fields')
        } else {
            console.log(values)
        }
    }

    useEffect(() => {
        getLocations();
      }, []);
    
    if (values.locations.length > 0) {
        return(
            <div>
                {values.locations.map((data) => ({
                    data
                }))}
            </div>
        )
    } else {
    return (
        <Paper className={classes.paper}>
            <Backdrop className={classes.backdrop} open={values.backdropOpen} onClick={handleClose}>
                <CircularProgress color="secondary" size={60} thickness={5}/>
            </Backdrop>
            <div className="form-group">
                <ToastContainer />
            </div>
            <form className={classes.root} autoComplete='off'>
                <Grid container>
                    <Grid item xs={4} className={classes.info}>
                        <Typography className={classes.infoHeading} variant="h4" gutterBottom>
                            Fill Tree data
                        </Typography>
                        <Typography className={classes.infoDetail} variant="h5" gutterBottom>
                            Please enter all the details for a tree
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            error={errors.name!==""?true:false}
                            variant='outlined'
                            label='Tree Name *'
                            name='name'
                            value={values.name}
                            helperText="Tree Name."
                            onChange = {handleInputchange}
                        />
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Select Location"
                            value={values.location}
                            onChange={handleInputchange}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select location"
                            variant="outlined"
                            >
                            {locations.map((option) => (
                                <option key={option.plot_id} value={option.name}>
                                {option.name}
                                </option>
                            ))}
                            </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            error={errors.sapling!==""?true:false}
                            variant='outlined'
                            label='Sapling ID *'
                            name='sapling'
                            value={values.sapling}
                            helperText="The unique number you received from 14Trees staff."
                            onChange = {handleInputchange}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{'margin-top':'10px'}}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date of plantation"
                                format="MM/dd/yyyy"
                                value={values.date}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={8} style={{'marginTop':'30px'}}>
                        <Button size='large' variant="contained" component="span" color='secondary' onClick={onSubmit}>Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
                            }
}