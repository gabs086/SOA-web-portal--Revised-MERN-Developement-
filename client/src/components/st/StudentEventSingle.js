import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import Navbar from "../layouts/Navbar";

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventNoteIcon from '@material-ui/icons/EventNote';

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
    
}));

function StudentEventSingle(props) {
	const classes = useStyles();

	return (
			<div>

				 <Navbar />

				  	<Container style={{paddingTop: 20}}>

					<Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
				        <Link color="inherit" href="/st/lostandfoundpage/events" className={classes.link}>
				          <DateRangeIcon className={classes.icon} />
				          Calendar
				        </Link>

				        <Link
				          color="textPrimary"
				          href={`/st/lostandfoundpage/events/${props.match.params.id}`}
				          aria-current="page"
				          className={classes.link}
				        >
				        <EventNoteIcon className={classes.icon} />
				          Event
				        </Link>
				    </Breadcrumbs>

                			<Paper className={classes.root} elevation={10}>

                				Single Events Here

                			</Paper>

				  	</Container>

			</div>
		)	
}

export default StudentEventSingle;