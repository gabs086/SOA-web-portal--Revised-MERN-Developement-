import React, { useState } from 'react';
import clsx from 'clsx';
//Redux components
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PublishIcon from '@material-ui/icons/Publish';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventIcon from '@material-ui/icons/Event';

//Link Components
import ListItemLink from './ListItemLink';

const drawerWidth = 240;

const Transition = props => {
    return <Slide direction="up" {...props} />
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

//Component
//The argument of the DashboardAdmin if for redux component in react hooks
function DashboardAdmin(props) {
    const classes = useStyles();
    const theme = useTheme();

    //States
    const [open, setOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    // onclick menu toggle
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onModalLogoutClick = _ => {
        setModalOpen(true)
    }

    const onHandleLogoutClickClose = _ => {
        setModalOpen(false)
    }

    const onLogOutClick = e => {
        props.logoutUser();
    }

    return (
        <div className={classes.root}>
            {/* Modal  */}
            <Dialog
                open={modalOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={onHandleLogoutClickClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {"Logging Out"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you you want to Logout?
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onHandleLogoutClickClose} variant="outlined" color="primary">
                        Cancel
                        </Button>
                    <Button onClick={onLogOutClick} variant="outlined" color="secondary">
                        Logout
                               </Button>
                </DialogActions>
            </Dialog>

            {/* Dashboard  */}
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar style={{ backgroundColor: "#820101" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        SOA Web Portal
          </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                open={open}
            >
                {/* SideNav Drawer Components */}
                <div className={classes.toolbar}>

                    <Typography>SOA Assistant Director</Typography>

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <MenuIcon /> : <MenuIcon />}
                    </IconButton>
                </div>

                <Divider />
                {/* Calendars and Events */}
                <List>

                    <ListItemLink 
                        to="/ad"
                        primary="Calendar"
                        icon={<EventIcon />}
                    />

                    <ListItemLink 
                        to="/ad/announceevent"
                        primary="Announce Events"
                        icon={<AnnouncementIcon />}
                    />
                            
                </List>
                    
                    <Divider />
                {/* Organization List, Accounts registration */}
                <List>

                    <ListItemLink 
                        to="/link3"
                        primary="Organization List"
                        icon={<FormatListBulletedIcon />}
                    />

                </List>

                <Divider />
                {/* Requested Activities and file uploading */}
                <List>

                    <ListItemLink 
                        to="/link4"
                        primary="Requested Activities"
                        icon={<ListAltIcon />}
                        count={4}
                    />
{/* 
                    This component will be just one for :
                    -Uploading of Files for student organizations and students to download
                    - POsting and Approving of Reports submitted by Student Organization */}

                    <ListItemLink 
                        to="/link5"
                        primary="Files and Reports"
                        icon={<PublishIcon />}
                    />

                    <Divider />

                    {/* ID Replacement Components  */}

                    <ListItemLink 
                        to="/link6"
                        primary="ID Replacement"
                        icon={<AssignmentIndIcon />}
                    />

                </List>

                <Divider />

                {/* Logout Option */}
                <List>
                    <ListItem style={{ color: "red" }} button onClick={onModalLogoutClick}>
                        <ListItemIcon>
                            <ExitToAppIcon color="error" />
                            </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>
                </List>
            </Drawer>

            {/* for the main content */}
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}

//Redux State connection 
const mapStateToProps = state => ({
    auth: state.auth
});
//Dipatch proptypes(React Hooks) 
const mapDispatchToProps = { logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAdmin);


