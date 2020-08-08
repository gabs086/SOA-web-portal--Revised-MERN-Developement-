import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import DashBoardHead from '../layouts/DashboardHead';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClic

const useStyles = makeStyles(theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

function HeadIndex(props){

    const classes = useStyles();

         const [events, setEvents] = useState([]);

    useEffect(_ => {
            axios.get('/api/announcements/')
                .then(res => setEvents(res.data))
                .catch(err => console.log(err));
            },[]);

    const dateClick = arg => {
        // console.log(arg);
        props.history.push(`/h/calendar/listOfEvents/${arg.dateStr}`)
    }

    const renderEventContent = eventInfo => (
            <Fragment>     
        {/*console.log(eventInfo) */}
     
            <a href={`/h/calendar/${eventInfo.event._def.publicId}`}>
              <span style={{color: 'white', backgroundColor:`${eventInfo.backgroundColor}`}}>
               
               <b>{eventInfo.timeText}</b> &nbsp;
                <span>{eventInfo.event.title}</span>

               </span>
            </a>
            </Fragment>
        )

        return (
            <div>
                <DashBoardHead>
                     <Paper className={classes.root}>

                        <FullCalendar
                            plugins={[ dayGridPlugin , interactionPlugin ]}
                            initialView="dayGridMonth"
                            weekends={true}
                            events={events}
                            eventContent={renderEventContent}
                            themeSystem='bootstrap'
                            dateClick={dateClick}
                          />

                     </Paper>
                </DashBoardHead>
            </div>
        )
}

export default HeadIndex;
