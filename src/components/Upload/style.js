
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
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
    },
    media: {
        height: '280px',
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
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    })
);