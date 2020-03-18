import React, { Component } from 'react';
import Navbar from "../layouts/Navbar";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import Button from '@material-ui/core/Button';

import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import EventIcon from '@material-ui/icons/Event';

// Material UI styles 
const styles = theme => ({
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
    
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

class StudentIndex extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Navbar />
                <Container style={{paddingTop: 20}}>
                <Paper className={classes.root} elevation={10}>
                <Typography variant="h5" component="h3">
                    WELCOME TO STUDENT DASHBOARD
                    </Typography>
                    <br/>
                    <Typography component="p">
                    In this Student Web Portal, You can :
                    </Typography>

                <div className={classes.root}>
                    <List component="nav">
                        {/* List 1  */}
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="File Reports for Lost and Found Items" />
                            </ListItem>

                            {/* L ist 2  */}
                        <ListItem button>
                            <ListItemIcon>
                                <ViewHeadlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="View BatStateU Organizational Reports" />
                            </ListItem>
                    

                        <ListItemLink href="#simple-list">
                        <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                        <ListItemText primary="View Calendar of Events" />
                        </ListItemLink>

                        <ListItemLink href="#simple-list">
                        <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                        <ListItemText primary="Join to activities led by Student Organizations" />
                        </ListItemLink>

                        <ListItemLink href="#simple-list">
                        <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                        <ListItemText primary="Download Files you need for getting the service of the university" />
                        </ListItemLink>
                    </List>
                </div>
                <center>
                <Button variant="outlined" color="secondary" className={classes.button}>
                    Secondary
                </Button>
                </center>

                </Paper>
                </Container>
            </div>
        )
    }
}

StudentIndex.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StudentIndex);
