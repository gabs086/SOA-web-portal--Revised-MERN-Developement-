import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import GetAppIcon from '@material-ui/icons/GetApp';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Collapse from '@material-ui/core/Collapse';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EventIcon from '@material-ui/icons/Event';

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
      },
})

class SideListNavbar extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            open: false
        }
    }

    handleClick(){
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        const handleClick = this.handleClick
        return (
            <div className={this.props.class}>
                 <List>
                    {/* Inclide a component of a for anchor tag */}
                    {/* Home Link  */}
                <ListItem button component="a" href="/st">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>

                {/* Lost and Found component  */}
                <ListItem button component="a" href="/st/lostandfoundpage">
                    <ListItemIcon>
                        <FindInPageIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lost & Found" />
                </ListItem>

                {/* Org Reports components  */}
                <ListItem button component="a" href="#">
                    <ListItemIcon>
                        <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="BatStateU Org Reports" />
                </ListItem>

                {/* Calendar of Events components  */}
                <ListItem button component="a" href="/st/lostandfoundpage/events">
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                    <ListItemText primary="Events" />
                </ListItem> 

              </List>

              <Divider />
         
              <List>
              {/*<ListItem button onClick={handleClick}>*/}
              <ListItem button component="a" href="/st/activities">

                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Activities" />
                        </ListItem>

                        {/* Static List for the Activities Will be update to dynamic list 
                            Removing this feature
                          */}
                        
                        {/*<Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <LocalActivityIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sample" />
                            </ListItem>
                        </List>
                        </Collapse>*/}

              </List>
              
              <Divider />

              <List>
                    {/* Downloadable Files Page  */}
                    <ListItem button onClick={this.props.onClickDownloads}>
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

export default withStyles(styles)(SideListNavbar);
