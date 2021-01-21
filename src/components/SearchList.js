import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

export default function SearchList(props)  {
    const classes = useStyles();

    if(props.type === "user") {
        return props.data.map((e) => {
            return (
                <List className={classes.root}>
                    <ListItem onClick={() => props.onItemSelect(e.id)}>
                        <ListItemIcon>
                        {
                            e.profile_image ? <Avatar src={e.profile_image} /> : <Avatar alt="Remy Sharp" />
                        }
                        </ListItemIcon>
                        <ListItemText id={e.id} primary={e.name} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
            )
        });
    } else if (props.type === "tree") {
        return  props.data.map((e) => {
            return (
                <List className={classes.root}>
                    <ListItem onClick={() => props.onItemSelect(e.id)}>
                        <ListItemText
                            primary={e.name.toUpperCase()}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                Sapling No : {e.sapling_id.toUpperCase()}
                                </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="middle" component="li" />
                </List>
            )
        });
    } else if (props.type === "loc") {
        return (
            <div>Location</div>
        )
    } else if (props.type === "event") {
        return (
            <div>Campaign</div>
        )
    }
}
