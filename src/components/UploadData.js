import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import React from 'react';
import api from '../api/local';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
    root: {
      marginRight: 'auto',
      marginTop:30,
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(1),
    },
    card: {
        maxWidth: 450,
        marginRight: 'auto',
        marginLeft: 'auto',
        minHeight: 300,
        position: 'relative'
    },
    cardButton: {
        display: 'grid',
        // justifyContent:'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%'
    },
    text:{
        paddingTop:'15%',
        marginLeft:'20%',
    }
  }));

export default function UploadData() {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [progress, setProgress] = React.useState(0);

    // On file upload (click the upload button)
    const checkFileSize=(event)=>{
        let file = event.target.files[0]
        let size = 1500000 // ~ 1500KB 
        let err = ""; 
        if (file.size > size) {
            err += file.type+'is too large, please pick a smaller file\n';
        }
        if (err !== '') {
            event.target.value = null
            console.log(err)
            return false
        }
    return true;
    }

    const onFileChange = event => {
        console.log(event.target.files)
        var file = event.target.files[0]
        if(checkFileSize(event)){ 
            // if return true allow to setState
            setSelectedFile(file)
        }
    }

    const LinearProgressWithLabel = (props) => {
        return (
          <Box display="flex" alignItems="center" style={{'marginLeft':15, 'marginTop':'15%'}}>
            <Box width="90%" mr={1}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
          </Box>
        );
      }

      LinearProgressWithLabel.propTypes = {
        /**
         * The value of the progress indicator for the determinate and buffer variants.
         * Value between 0 and 100.
         */
        value: PropTypes.number.isRequired,
      };
    const upload = async () => {
        console.log(selectedFile)
        const data = new FormData() 
        data.append('file', selectedFile)
        api.post('/api/v1/upload/csv', data, {
            onUploadProgress: progress => {
                const { loaded, total } = progress
                const percentageProgress = Math.floor((loaded/total) * 100)
                setProgress(percentageProgress)
              },
        }).then(data => {
            toast.success('Data successfully uploaded.')
            console.log(data);
        }).catch(err => {
            toast.error('Error uploading data!!!')
            console.log(err)
        })
    };
    return (
        <div className={classes.root}>
            <div className="form-group">
                <ToastContainer />
            </div>
            <Card className={classes.card}>
                <div style={{'display':'grid'}}>
                    <h5 className={classes.text}>Select the csv file for upload</h5>
                    <input
                        accept=".csv"
                        style={{'marginLeft':'25%', 'marginTop': '10%'}}
                        type="file"
                        id="contained-button-file"
                        onChange={onFileChange}
                    />
                    <LinearProgressWithLabel value={progress} />
                    <CardActions className={classes.cardButton}>
                        <Button
                            variant="outlined"
                            color="primary"
                            component="span"
                            disabled={!selectedFile}
                            onClick={upload}
                        >
                        Upload
                        </Button>
                    </CardActions>
                </div>
            </Card>
            {/* <label htmlFor="contained-button-file">
                <input
                    accept=".csv"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component="span"
                    className={classes.button}
                    startIcon={<ListIcon />}
                >
                    Select CSV
                </Button>
            </label>
            <div className="file-name">
                {selectedFile && selectedFile.length > 0 ? selectedFile[0].name : null}
            </div>
            <Button */}
                {/* variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                component="span"
                disabled={!selectedFile}
                onClick={upload}
            >
                Upload file
            </Button> */}
        </div>
    )
}