import React, { useState, useEffect, Fragment } from 'react';
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

//This will be the style of the in the calendar
// function renderEventContent(eventInfo) {

//     const [events, setEvents] = useState([]);

//       useEffect(_ => {
//         axios.get('/api/announcements/')
//         .then(res => setEvents(res.data))
//         .catch(err => console.log(err));
//     },[]);

//     return (
//          <Fragment>
//               <span style={{color: 'white', backgroundColor:'blue'}}>
//               <b>{eventInfo.timeText}</b>
//               <span>{eventInfo.event.title}</span>
//               </span>
//             </Fragment>
//         )
// }

function StudentCalendar(props) {
	const classes = useStyles();

    const [events, setEvents] = useState([]);

    useEffect(_ => {
        axios.get('/api/announcements/')
        .then(res => setEvents(res.data))
        .catch(err => console.log(err));
    },[]);

    // console.log(events);

    const renderEventContent = eventInfo => (
            <Fragment>     
        {console.log(eventInfo)}

            {
              events.map(row => (
              <span style={{color: 'white', backgroundColor:`${eventInfo.backgroundColor}`}}>
               
               <b>{eventInfo.timeText}</b> &nbsp;
                <span>{eventInfo.event.title}</span>

               </span>

                    ))
            }
            </Fragment>
        )

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
                            eventContent={renderEventContent}
					      />

                	</Paper>

                </Container>
		</div>

		)
}

export default StudentCalendar;