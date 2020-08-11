import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import clsx from 'clsx';

import Navbar2 from "../layouts/Navbar2";

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
import WarningIcon from '@material-ui/icons/Warning';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

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

function OrgEvents(props) {
	const classes = useStyles();

    //State for the events
    const [events, setEvents] = useState([]);
    const [ifError, setIfError] = useState(false);

    //Component Effect
    useEffect(_ => {
        axios.get(`/api/announcements/getByDate/${props.match.params.dateDate}`)
        .then(res => setEvents(res.data))
        .catch(err => {
            if(err)
                setIfError(true)
        });
    },[]);
    // console.log(events);
	return (
			<div>

				 <Navbar2 />

				  	<Container style={{paddingTop: 20}}>

					<Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
				        <Link color="inherit" href="/org/calendar" className={classes.link}>
				          <DateRangeIcon className={classes.icon} />
				          Calendar
				        </Link>

				        <Link
				          color="textPrimary"
				          href={``}
				          aria-current="page"
				          className={classes.link}
				        >
				        <EventNoteIcon className={classes.icon} />
				          Events
				        </Link>
				    </Breadcrumbs>

                        <Fragment>
                     {/*check if Theres an error

                             <Typography variant="h1" component="h2" color="textSecondary">
                                            There's an error. Please refresh the page...
                                        </Typography>
                     */}
                            {
                                ifError
                                ?
                                <Grid container spacing={3}>
                                     <Grid item xs>
                                     </Grid>

                                     <Grid item xs={6}>
                                      <Typography variant="body2" color="textSecondary" component="p" align="center">
                                            <WarningIcon style={{color: 'red'}} /> <br />
                                            There's an error. Please refresh the page...
                                        </Typography>
                                     </Grid>

                                    <Grid item xs>
                                    </Grid>
                                </Grid>
                                :
                                <Fragment>
                                    {
                                        events.length === 0 
                                        ?
                                          <Grid container spacing={3}>
                                             <Grid item xs>
                                             </Grid>

                                             <Grid item xs={6}>
                                              <Typography variant="body2" color="textSecondary" component="p" align="center">
                                                    <SentimentVerySatisfiedIcon style={{color: 'green'}} /> <br />
                                                    There are no events for this date. Please other dates for events.
                                                </Typography>
                                             </Grid>

                                            <Grid item xs>
                                            </Grid>
                                        </Grid>

                                        :

                                    <Fragment>
                                        {

                                        events.map(event => (

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

                                            ))

                                    }
                                    </Fragment>


                                    }
                                </Fragment>
                            }

                        </Fragment>
                        

				  	</Container>

			</div>
		)	
}

export default OrgEvents;