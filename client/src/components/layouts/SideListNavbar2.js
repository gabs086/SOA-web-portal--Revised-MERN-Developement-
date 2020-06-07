import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
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
const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing(2),
      },
})

class SideListNavbar2 extends Component {

    render() {
        const { classes } = this.props;
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
                <ListItem button component="a" href="#">
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                    <ListItemText primary="Calendar" />
                </ListItem>

                {/* Org Reports components  */}
                <ListItem button component="a" href="#">
                    <ListItemIcon>
                        <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Activities (Request, Reports)" />
                </ListItem>

              <ListItem button component="a" href="#">
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Activity Assessment" />
                        </ListItem>


                <ListItem button component="a" href="#">
                		 <ListItemIcon>
                            <Badge badgeContent={0} color="secondary">
						        <NotificationsIcon />
						      </Badge>
                        </ListItemIcon>

                        <ListItemText primary="Notifications" />

                </ListItem>

              </List>
              
              <Divider />

              <List>
                    {/* Downloadable Files Page  */}
                    <ListItem>
                        <ListItemIcon>
                            <GetAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Downloadable Files" />
                    </ListItem>

                    <ListItem style={{ color: "red" }} button onClick={this.props.onClick}>
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
}

export default withStyles(styles)(SideListNavbar2);
