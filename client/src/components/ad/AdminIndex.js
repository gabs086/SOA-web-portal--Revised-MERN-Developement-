import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//Admin Dashboard Component
import DashboardAdmin from '../layouts/DashboardAdmin';

//Calendar Components
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

function AdminIndex(props){
        const classes = useStyles();

            const [events, setEvents] = useState([]);

            useEffect(_ => {
                axios.get('/api/announcements/')
                .then(res => setEvents(res.data))
                .catch(err => console.log(err));
            },[]);


    const renderEventContent = eventInfo => (
            <Fragment>     
        {/*console.log(eventInfo) */}
     
              <span style={{color: 'white', backgroundColor:`${eventInfo.backgroundColor}`}}>
               
               <b>{eventInfo.timeText}</b> &nbsp;
                <span>{eventInfo.event.title}</span>

               </span>
               
            </Fragment>
        )

    var calendar = new FullCalendar();

    console.log(calendar);

        return (
            <div>
                <DashboardAdmin>
                    <Paper className={classes.root}>

                        <FullCalendar
                            plugins={[ dayGridPlugin , interactionPlugin ]}
                            initialView="dayGridMonth"
                            weekends={true}
                            events={events}
                            eventContent={renderEventContent}
                            themeSystem='bootstrap'
                          />

                    </Paper>
                </DashboardAdmin>
            </div>
        )
    
}

export default AdminIndex;
