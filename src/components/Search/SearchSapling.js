import React, { useEffect, useRef } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import nameplate from './nameplate.png'

const useStyles = makeStyles((theme) => ({
    cardError: {
        display: '',
        margin: 'auto',
        width: 340,
        height: 340,
        marginTop: '3%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    cardProfile: {
        width: '80vw',
        minHeight: 700,
        margin: 'auto',
        marginTop: 15,
        marginBottom: 20,
        display: 'flex'
    },
    info: {
        width: '40vw',
        marginLeft: 'auto',
        marginTop: 30,
        marginRight: 10,
        marginBottom: 30,
    },
    gallery:{
        display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20)
    },
    nameplate: {
        // margin:'auto',
        marginTop:30,
        position:'relative',
    },
    desc: {
        margin:'auto',
    },
}));

export default function SearchSapling(props) {
    // const prevProps = useRef(props);

    useEffect(() => {
        console.log("Update")
      }, [props.data]);
    const classes = useStyles();
    console.log(props)

    return (
        <div>
            {props.data.length === 0
                
                ?

            <Card className={classes.cardError}>
                {/* <CardMedia
                    className={classes.media}
                    image= {<ErrorIcon/>}
                    title="tree"
                />
                 */}
                <ErrorIcon style={{ fontSize: 160, color:'#ffcc5f', marginTop:'10%' }}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Record Not Found!
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Please check the Sapling ID
                    </Typography>
                </CardContent>
            </Card>
                
                : 
            
            <Card className={classes.cardProfile}>
                <CardContent className={classes.desc}>
                    <h2 style={{fontWeight:400}}>{props.data.person.name}</h2>
                    <h3 style={{fontWeight:500}}>{props.data.tree.name}</h3>
                    <h5 style={{fontWeight:500}}>Plantation date : {props.data.date}</h5>
                </CardContent>
                <Card className={classes.info}>
                    <div className={classes.nameplate}>
                        <img src={nameplate} width="450" height="300" alt=""/>
                    </div>
                    {/* <CardContent>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="300"
                            image={props.data.user_image[0]}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                                {props.data.person.name}
                            </Typography>
                            <Typography variant="h5" color="textSecondary" component="p">
                                Planted {props.data.tree.name}
                            </Typography>
                        </CardContent>
                    </CardContent> */}
                    <CardContent className={classes.gallery}>
                        {props.data.user_image.map((e) => {
                            return (
                                <Avatar variant="rounded" alt="" src={e} className={classes.avatar}/>
                            )
                        })}
                        {props.data.gallery.map((e) => {
                            return (
                                <Avatar variant="rounded" alt="" src={e} className={classes.avatar}/>
                            )
                        })}
                    </CardContent>
                </Card>
            </Card>
            
            }
        </div>
    )
}