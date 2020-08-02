import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from "../layouts/Navbar";

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClic


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
    
}));

function StudentCalendar(props) {
	const classes = useStyles();

    const [events, setEvents] = useState([]);

    useEffect(_ => {
        axios.get('/api/announcements/')
        .then(res => setEvents(res.data))
        .catch(err => console.log(err));
    },[]);

    // console.log(events);

	return (
		<div>
                <Navbar />

                <Container style={{paddingTop: 20}}>

                	<Paper className={classes.root} elevation={10}>

                		<FullCalendar
					        plugins={[ dayGridPlugin , interactionPlugin ]}
					        initialView="dayGridMonth"
					        weekends={true}
                            events={events}
					      />

                	</Paper>

                </Container>
		</div>

		)
}

export default StudentCalendar;