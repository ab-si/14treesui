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
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import { useAuth } from "./context/auth";


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
    },
    tabs:{
        marginRight: 'auto',
        marginLeft: 'auto',
        display:'inline-block'
    },
    tab:{
        marginRight: 'auto',
        marginLeft: 'auto',
    }
  }));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }

export default function UploadData(props) {
    const { authTokens } = useAuth();
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [value, setValue] = React.useState('one');
    const [sheetname, setSheetname] = React.useState('');
    const handleSheetNameChange = (event) => {
        setSheetname(event.target.value);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
    const uploadCsv = async () => {
        const data = new FormData()
        data.append('file', selectedFile)
        api.post('/api/v1/upload/csv', data, {
            onUploadProgress: progress => {
                const { loaded, total } = progress
                const percentageProgress = Math.floor((loaded/total) * 100)
                setProgress(percentageProgress)
              },
              headers: {
                'x-access-token': authTokens 
              }
        }).then(data => {
            toast.success('Data successfully uploaded.')
        }).catch(err => {
            toast.error('Error uploading data!!!')
            console.log(err)
        })
    };

    const uploadTreeCsv = async () => {
        const data = new FormData()
        data.append('file', selectedFile)
        api.post('/api/v1/upload/treecsv', data, {
            onUploadProgress: progress => {
                const { loaded, total } = progress
                const percentageProgress = Math.floor((loaded/total) * 100)
                setProgress(percentageProgress)
              },
              headers: {
                'x-access-token': authTokens 
              }
        }).then(data => {
            toast.success('Tree Data successfully uploaded.')
        }).catch(err => {
            toast.error('Error uploading data!!!')
            console.log(err)
        })
    };

    const uploadSheetCsv = async() => {
        const res = await api.post('/api/v1/upload/googlecsv',{
            params: {
                sheetname : sheetname,
            }
        },
        {
            headers: {
                'x-access-token': authTokens 
              }
        });
        if (res.status===200){
            toast.success('Data successfully uploaded.')
        } else {
            toast.error('Error uploading data!!!')
        }
    }
    return (
        <div className={classes.root}>
            <div className="form-group">
                <ToastContainer />
            </div>
            <Tabs className={classes.tabs}
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab value="one" label="Upload CSV" {...a11yProps('one')} className={classes.tab}/>
                <Tab value="two" label="Upload via Google Sheet" {...a11yProps('two')} className={classes.tab}/>
                <Tab value="three" label="Upload Tree CSV data" {...a11yProps('three')} className={classes.tab}/>
            </Tabs>
            <TabPanel value={value} index="one">
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
                                onClick={uploadCsv}
                            >
                            Upload
                            </Button>
                        </CardActions>
                    </div>
                </Card>
            </TabPanel>
            <TabPanel value={value} index="two">
                <Card className={classes.card}>
                    <div style={{'display':'block', 'marginTop':'10%'}}>
                        <h6>1 : Add data to this doc in a new sheet. <a href="https://docs.google.com/spreadsheets/d/1R6CyD_pPLcsah9rlPwJ4dqcLtzkptxJJCrm-dQBu6qM/edit#gid=1637936530" target="_blank" rel="noopener noreferrer">Doc Link</a></h6>
                        <h6>2 : Make sure to add the data in the given format</h6>
                        <h6>3 : Give the sheet a name. Enter the name here:</h6>
                    </div>
                    <TextField id="standard-name" label="Sheet Name" value={sheetname} onChange={handleSheetNameChange} />
                    <CardActions className={classes.cardButton}>
                        <Button
                            variant="outlined"
                            color="primary"
                            component="span"
                            disabled={!sheetname}
                            onClick={uploadSheetCsv}
                        >
                        Upload
                        </Button>
                    </CardActions>
                </Card>
            </TabPanel>
            <TabPanel value={value} index="three">
                <Card className={classes.card}>
                    <div style={{'display':'grid'}}>
                        <h5 className={classes.text}>Select the csv file for uploading Tree data</h5>
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
                                onClick={uploadTreeCsv}
                            >
                            Upload Tree Data
                            </Button>
                        </CardActions>
                    </div>
                </Card>
            </TabPanel>
            <Divider orientation="vertical" />
        </div>
    )
}
