import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography, Avatar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import api from '../api/local';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tree from '../tree.png'

import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const intitialFValues = {
    sapling: '',
    name: '',
    org: '',
    date: new Date(),
    email: '',
    contact: '',
    userImages: [],
    userImage1: null,
    userImage2: null,
    additionalImages: null,
    userImage1src:null,
    userImage2src:null,
    addImage1src:null,
    addImage2src:null,
    addImage3src:null,
    error:null,
    uploaded:false
}

const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root':{
            width: '80%',
            margin: theme.spacing(1),
        }
    },
    successRoot: {
        margin: 'auto',
        marginTop:'5%',
        width: 350,
        height:350,
    },
    media: {
        height: '160px',
        paddingTop: '56.25%',
    },
    paper: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    info:{
        justifyContent:'center',
        margin: 'auto'
    },
    infoHeading: {
        fontWeight: 200
    },
    infoDetail: {
        fontWeight: 100
    },
    input: {
        display: 'none',
    },
    helper: {
        width:'80%',
        margin:'auto'
    },
    caption:{

    },
    images:{
        display:'flex',
        justifyContent:'center'
    }
})
);

export default function VisitorForm() {

    const [values, setValues] = useState(intitialFValues);
    const [errors, setErrors] = useState({});
    const classes = useStyle();
    const PROFILE_IMG_MAX=2;
    const ADDITIONAL_IMG_MAX=10;

    const validate = () => {
        let temp = {};
        temp.name = values.name ? "" : "Required Field"
        temp.sapling = values.sapling ? "" : "Required Field"
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
    
    const handleAdditionalPicUpload = (e) => {
        console.log("Here")
        if (Array.from(e.target.files).length > ADDITIONAL_IMG_MAX) {
            // e.preventDefault();
            setValues({
                ...values,
                error:true
            })
          }
        setValues({
            ...values,
            additionalImages:e.target.files,
            addImage1src:URL.createObjectURL(e.target.files[0]),
            addImage2src:e.target.files[1] ? URL.createObjectURL(e.target.files[1]) : null,
            addImage3src:e.target.files[2] ? URL.createObjectURL(e.target.files[2]) : null,
            error:null
        })
    }

    const handleProfilePicUpload = (e) => {
        if (Array.from(e.target.files).length > PROFILE_IMG_MAX) {
            setValues({
                ...values,
                error:true
            })
            return
            // e.preventDefault();
          }
        setValues({
            ...values,
            userImages:e.target.files,
            userImage1:e.target.files[0] ? e.target.files[0] : null,
            userImage2:e.target.files[1] ? e.target.files[1] : null,
            userImage1src:e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null,
            userImage2src:e.target.files[1] ? URL.createObjectURL(e.target.files[1]) : null,
            error:null
        })
    }

    const onSubmit = (e) => {
        if(!validate()){
            toast.error('Please fill mandatory fields')
        } else {
            const formData = new FormData()
            formData.append('email', values.email);
            formData.append('org', values.org);
            formData.append('date', values.date);
            formData.append('contact', values.contact);
            formData.append('sapling', values.sapling);
            const userImages = [];
            const extraImages = [];
            if (values.userImages) {
                for (const key of Object.keys(values.userImages)) {
                    formData.append('userImages', values.userImages[key])
                    userImages.push(values.userImages[key].name)
                }
            }
            
            if (values.additionalImages) {
                for (const key of Object.keys(values.additionalImages)) {
                    formData.append('userImages', values.additionalImages[key])
                    extraImages.push(values.additionalImages[key].name)
                }
            }
            
            formData.append('userImages', userImages);
            formData.append('extraImages', extraImages);
            api.post('/api/v1/visitor/form', formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                },
            }).then(data => {
                setValues({
                    ...values,
                    uploaded:true
                })
            }).catch(err => {
                toast.error('Error uploading data!!!')
                console.log(err)
            })
        }
    }

    if(values.uploaded){
        console.log(tree)
        return(
            <div>
                <Alert severity="success">Your form has been uploaded successfully!</Alert>
                <Card className={classes.successRoot}>
                    <CardContent style={{'marginTop':'5%'}}>
                        <Typography variant="h5" component="h2">
                            Form Submitted
                        </Typography>
                        <CardMedia
                            className={classes.media}
                            src={tree}
                            title="tree"
                            component='img'
                        />
                        <Typography variant="body2" color="textSecondary" component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    } else {
        return(
            <Paper className={classes.paper}>
                <div className="form-group">
                    <ToastContainer />
                </div>
                {values.error &&  <Alert severity="error">Please select at max two profile images!</Alert>}
                <form className={classes.root} autoComplete='off'>
                    <Grid container>
                        <Grid item xs={4} className={classes.info}>
                            <Typography className={classes.infoHeading} variant="h2" gutterBottom>
                                Thank You!
                            </Typography>
                            <Typography className={classes.infoDetail} variant="h5" gutterBottom>
                                For planting a tree.
                                Please fill this form for details about your experience.
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                error={errors.name!==""?true:false}
                                variant='outlined'
                                label='Full Name *'
                                name='name'
                                value={values.name}
                                helperText="The name you want to be displayed on the physical name plate."
                                onChange = {handleInputchange}
                            />
                            <TextField
                                variant='outlined'
                                label='Email'
                                name='email'
                                value={values.email}
                                onChange = {handleInputchange}
                            />
                            <TextField
                                variant='outlined'
                                label='Contact'
                                name='contact'
                                value={values.contact}
                                onChange = {handleInputchange}
                            />
                            <div style={{'marginTop':'20px'}}>
                                <Typography variant="subtitle2" gutterBottom className={classes.helper}>
                                    Upload two photographs of yours with sapling.
                                </Typography>
                                <Typography variant="caption" gutterBottom className={classes.caption}>
                                    These photographs will go on 14Trees site along with digital name plate.    
                                </Typography>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleProfilePicUpload}
                                />
                            </div>
                            <div style={{'display':'flex', 'marginLeft':'50px', 'marginTop':'10px'}}>
                                <Avatar alt="U" src={values.userImage1src? values.userImage1src : null} style={{'marginLeft':'10px'}}/>
                                <Avatar alt="U" src={values.userImage2src? values.userImage2src : null} />
                                <label htmlFor="contained-button-file" style={{'display':'block', 'marginTop':'5px'}}>
                                    <Button variant="contained" component="span" color='primary' style={{'marginLeft':'50px'}}>
                                    Upload your pic
                                    </Button>
                                </label>
                            </div>
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
                            <TextField
                                variant='outlined'
                                label='Organization'
                                name='org'
                                value={values.org}
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
                            <div style={{'marginTop':'30px'}}>
                                <Typography variant="subtitle2" gutterBottom className={classes.helper}>
                                    Feel free to share the photographs from your visit with others
                                </Typography>
                                <Typography variant="caption" gutterBottom className={classes.caption}>
                                    You can add max ten photographs, so be selective!
                                </Typography>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="additional-image-file"
                                    multiple
                                    type="file"
                                    onChange={handleAdditionalPicUpload}
                                />
                            </div>
                            <div style={{'display':'flex', 'justifyContent':'center', 'marginTop':'10px'}}>
                                <Avatar alt="U" src={values.addImage1src? values.addImage1src : null} style={{'marginLeft':'10px'}}/>
                                <Avatar alt="U" src={values.addImage2src? values.addImage2src : null} />
                                <Avatar alt="U" src={values.addImage3src? values.addImage3src : null} />
                                <label htmlFor="additional-image-file" style={{'display':'block', 'marginTop':'5px'}}>
                                    <Button variant="contained" component="span" color='primary' style={{'marginLeft':'50px'}}>
                                    Add more pics
                                    </Button>
                                </label>
                            </div>
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