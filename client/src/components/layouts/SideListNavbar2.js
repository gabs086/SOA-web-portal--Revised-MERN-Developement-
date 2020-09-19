import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import GetAppIcon from '@material-ui/icons/GetApp';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EventIcon from '@material-ui/icons/Event';

import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(2),
      },
}))

function SideListNavbar2 (props) {

    const classes = useStyles();

    //state
    const [count, setCount] = useState(0);
    const [notifUpdated, setNotifUpdated] = useState(false);

    //Event handlers/
         const handleUpdateNotif = status => {
                const { auth } = props;
                const read = { status };

                axios.post(` /api/requestactivities/updatenotifcountorg/${auth.user.username}`, read)
                .then(res => {
                    setNotifUpdated(true);
                    props.history.push('/org/notifications');
                })
                .catch(err => console.log(err));
            }

    //component effect

     useEffect(_ => {
        const { auth } = props;

        axios.get(`/api/requestactivities/countorgnotif/${auth.user.username}`)
        .then(res => setCount(res.data))
        .catch(err => err);

    },[notifUpdated]);

        return (
            <div className={classes.nested}>
                 <List>
                    {/* Inclide a component of a for anchor tag */}
                    {/* Home Link  */}
                <ListItem button component="a" href="/org">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>

                {/* Calendar of Events components  */}
                <ListItem button component="a" href="/org/calendar">
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                    <ListItemText primary="Calendar" />
                </ListItem>

                {/* Org Reports components  */}
                <ListItem button component="a" href="/org/activitysections">
                    <ListItemIcon>
                         <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Activities (Request, Reports)" />
                </ListItem>

              <ListItem button component="a" href="/org/assessment">
                        <ListItemIcon>
                                <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Activity Assessment" />
                        </ListItem>


                <ListItem button component="a" href="#" onClick={_ => handleUpdateNotif('read')}>
                		 <ListItemIcon>
                            <Badge badgeContent={count} color="secondary">
						        <NotificationsIcon />
						      </Badge>
                        </ListItemIcon>

                        <ListItemText primary="Notifications" />

                </ListItem>

              </List>
              
              <Divider />

              <List>
                    {/* Downloadable Files Page  */}
                    <ListItem button onClick={props.onClickDownload}>
                        <ListItemIcon>
                            <GetAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Downloadable Files" />
                    </ListItem>

                    <ListItem style={{ color: "red" }} button onClick={props.onClick}>
                        <ListItemIcon>
                            <PowerSettingsNewIcon color="error"/>
                        </ListItemIcon>
                        <ListItemText 
                        primary="Logout" />
                    </ListItem>
                </List>
              
            </div>
        )
    }

SideListNavbar2.propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default withRouter(connect(mapStateToProps)(SideListNavbar2)) ;
