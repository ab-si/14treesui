import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    marginBottom: 15,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '20%',
    flexShrink: 0,
    fontWeight: 'bold',
    marginRight: 5
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '20%',
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
  data: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '20%',
    flexShrink: 0,
    marginRight: 5
  }
}));

const colortheme = createMuiTheme({
  palette: {
    secondary: { main: "#ffcc5f", contrastText: "#000" },
    primary: { main: "#3F3F3F", contrastText: "#000" }
  }
});

export default function DataDisplay(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    console.log(panel)
    setExpanded(isExpanded ? panel : false);
  };

  const dataDisplay = () => {
    return props.data.map((e) => {
      let name;
      if (props.type === 'user') {
        name = <Typography className={classes.data}>{e.person_name}</Typography>
      } else if (props.type === 'event') {
        name = <Typography className={classes.data}>{e.event_name}</Typography>
      } else if (props.type === 'loc') {
        name = <Typography className={classes.data}>{e.loc_name}</Typography>
      } else if (props.type === 'tree') {
        name = <Typography className={classes.data}>{e.tree_name}</Typography>
      }
      return (
          <Accordion expanded={expanded === e.id} onChange={handleChange(e.id)}>
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              // expandIcon={<ExpandMoreIcon />}
            >
              {name}
              <Typography color="error" className={classes.data}>{e.sapling_id}</Typography>
              <Typography className={classes.data}>{e.loc_name}</Typography>
              <Typography className={classes.data}>{e.date}</Typography>
              <Typography className={classes.data}>{e.event_name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Card style={{"minWidth": 100}}>
              <CardHeader
                avatar={
                  <Avatar alt="Remy Sharp" src="" />
                }
                title="Tree Information"
                subheader="Learn more about the tree"
              />
              </Card>
              <Card style={{"minWidth": 100}}>
              <CardHeader
                title="Profile Images"
                avatar={
                  <AvatarGroup max={4}>
                    <Avatar alt="Remy Sharp" src="" />
                    <Avatar alt="Remy Sharp" src="" />
                    <Avatar alt="Remy Sharp" src="" />
                    <Avatar alt="Remy Sharp" src="" />
                    <Avatar alt="Remy Sharp" src="" />
                  </AvatarGroup>
                }
              />
              </Card>
            </AccordionDetails>
          </Accordion>
      )
    })
  }

  return (
    <ThemeProvider theme={colortheme}>
      <div className={classes.root}>
        <Accordion style={{'backgroundColor':'#ffcc5f'}}>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography color="primary" className={classes.heading}>Name</Typography>
            <Typography color="primary" className={classes.heading}>Tree number</Typography>
            <Typography color="primary" className={classes.heading}>Location</Typography>
            <Typography color="primary" className={classes.heading}>Plantation Date</Typography>
            <Typography color="primary" className={classes.heading}>Event Name</Typography>
          </AccordionSummary>
        </Accordion>
        {dataDisplay()}
      </div>
    </ThemeProvider>
  );
}
