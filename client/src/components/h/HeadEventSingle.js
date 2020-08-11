import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import moment from 'moment';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventNoteIcon from '@material-ui/icons/EventNote';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { red } from '@material-ui/core/colors';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';

import Grid from '@material-ui/core/Grid';


import DashBoardHead from '../layouts/DashboardHead';

// Material UI styles 
const useStyles = makeStyles(theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
      },
    input: {
        display: 'none',
      },
    link: {
    display: 'flex',
  },
   icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
   card: {
   float: 'center',
    maxWidth: 500,
  },
  media: {
    textAlign: "center"
  },
  avatar: {
    backgroundColor: red[500],
  },
    
}));

function HeadEventSingle(props){

    const classes = useStyles();

    const [event, setEvent] = useState({});

    useEffect(_ => {
        axios.get(`/api/announcements/${props.match.params.id}`)
        .then(res => setEvent(res.data))
        .catch(err => console.log(err));
    },[]);


        return (
            <div>
                <DashBoardHead>
                    <Container style={{paddingTop: 20}}>

                     <Paper className={classes.root}>


                    <Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
                        <Link color="inherit" href="/h" className={classes.link}>
                          <DateRangeIcon className={classes.icon} />
                          Calendar
                        </Link>

                        <Link
                          color="textPrimary"
                          href={`/h/calendar/${props.match.params.id}`}
                          aria-current="page"
                          className={classes.link}
                        >
                        <EventNoteIcon className={classes.icon} />
                          Event
                        </Link>
                    </Breadcrumbs>



                    <Grid container spacing={3}>
                            <Grid item xs>
                            </Grid>

                            <Grid item xs={6}>
                                 
                                    <Card className={classes.card}>
                                      <CardHeader
                                        avatar={
                                          <Avatar aria-label="recipe" className={classes.avatar}>
                                            SOA
                                          </Avatar>
                                        }
                                        // action={
                                        //   <IconButton aria-label="settings">
                                        //     <MoreVertIcon />
                                        //   </IconButton>
                                        // }
                                        title={event.title}
                                        subheader={`${moment(event.dateDate).format('MMMM D YYYY')} by: ${event.setBy}`}
                                      />

                                  <CardMedia className={classes.media}>
                                        <img style={{height: "340px", width: "450px"}} src={`${event.poster}`}/>
                                  </CardMedia>

                                      <CardContent>
                                         <Typography variant="body2" color="textSecondary" component="p">
                                          Venue: {event.venue}
                                        </Typography>

                                        <Typography variant="body2" color="textPrimary" component="p">
                                          {event.description}
                                        </Typography>
                                      </CardContent>
                                      <CardActions disableSpacing>
                                      
                                      </CardActions>
                                   
                                    </Card>
                                    
                            </Grid>

                            <Grid item xs>
                            </Grid>


                          </Grid>

                     </Paper>
                    </Container>

                </DashBoardHead>
            </div>
        )
}

export default HeadEventSingle;
