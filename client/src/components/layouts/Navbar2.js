import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import { withRouter } from "react-router";
import SideListNavbar2 from './SideListNavbar2';

//Materialize Components
import { withStyles , makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
     root: {
        width: "100%",
    },
    title: {
        display: 'none',
        [theme.breakpoints.up("sm")]: {
            display: "block"
        },
        flexGrow: 1
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

    //Drawer style components
    list:{
        width: 250,
    }
}));

const styles = theme => ({
    root: {
        width: "100%",
    },
    title: {
        display: 'none',
        [theme.breakpoints.up("sm")]: {
            display: "block"
        },
        flexGrow: 1
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

    //Drawer style components
    list:{
        width: 250,
    }
});

const Transition = props => {
    return <Slide direction="up" {...props} />
}


//Navbar For Students
function Navbar2 (props) {

    // State ++++++++++++++

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorDropDownEl, setAnchorDropDownEl] = useState(null);
    const [modalLogout, setModalLogout] = useState(null);
    const [side, setSide] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    // Notification count
    const [count, setCount] = useState(0);

    const [notifUpdated, setNotifUpdated] = useState(false);

    // Event Handlers +++++++++++++

    //Drawer Toggle
   const toggleDrawer = (side, open) => event => {

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSide({ ...side, [side]: open });
    }

    const handleActivityOpen = e => {
        // this.setState({ anchorEl: e.currentTarget });
        setAnchorEl(e.currentTarget);
    }

   const handleMenuClose = _ => {
        // this.setState({ anchorEl: null });
        setAnchorEl(null);
    }

   const handleSettingsOpen = e =>  {
        // this.setState({ anchorDropDownEl: e.currentTarget });
        setAnchorDropDownEl(e.currentTarget);
    }

    const handleSettingsClose = _ => {
        // this.setState({ anchorDropDownEl: null });
        setAnchorDropDownEl(null);
    }

    // Modal Logout Function 
    const onModalLogoutClick = _ => {
        // this.setState({ modalLogout: true })
        // this.setState({ anchorDropDownEl: null });
            setModalLogout(true);
            setAnchorDropDownEl(null)
    }

    const onHandleLogoutClickClose = _ => {
        // this.setState({ modalLogout: false })
        setModalLogout(false);
    }

    // Logout Function
    const onLogoutClick = _ => {
        props.logoutUser();
    }

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


    // Component Effects ++++++++++++++

    // Getting the notification count 
    useEffect(_ => {
        const { auth } = props;

        axios.get(`/api/requestactivities/countorgnotif/${auth.user.username}`)
        .then(res => setCount(res.data))
        .catch(err => err);

    },[notifUpdated]);


        const classes  = useStyles();
        const isMenuOpen = Boolean(anchorEl);
        const isSettingsOpen = Boolean(anchorDropDownEl);

        // Activities Mobile Components
        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>Menu Item 1 </MenuItem>
                <MenuItem onClick={handleMenuClose}>Menu Item 2 </MenuItem>
            </Menu>
        );
            // Setings Monile component
        const renderSettings = (
            <Menu
                anchorEl={anchorDropDownEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isSettingsOpen}
                onClose={handleSettingsClose}
            >
                <MenuItem onClick={handleSettingsClose}>Downloadable Files </MenuItem>
                <MenuItem onClick={onModalLogoutClick} style={{ color: "red" }}>Logout </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                {/* Modal */}
                <Dialog
                    open={modalLogout}
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
                        <Button onClick={onLogoutClick} variant="outlined" color="secondary">
                            Logout
                               </Button>
                    </DialogActions>
                </Dialog>


                {/* Navbar  */}
                <AppBar position="static">
                    <Toolbar style={{ background: "#8a1c1c" }}>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                SOA Web Portal
                        </Typography>

                        <div className={classes.sectionDesktop}>
                            <Button color="inherit" href="/org">Home</Button>
                            <Button color="inherit" href="/org/calendar">
                                Calendar
                            </Button>
                            <Button color="inherit" href="/org/activitysections">Activities (Request, Reports)</Button>
                            <Button color="inherit" href="/org/assessment">Activity Assessment</Button>

                        {/* This will be the link for measuring the notifications for the request activities*/}
                            <Button color="inherit" onClick={_ => handleUpdateNotif('read')}>
                                <Badge badgeContent={count} color="secondary">
                                    <NotificationsIcon />
                                  </Badge>
                            </Button>

                            <Button
                                color="inherit"
                                aria-owns={isSettingsOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={handleSettingsOpen}
                            >
                                <SettingsIcon />
                            </Button>
                        </div>

                        {/* Drawer Mobile components  */}
                        <div className={classes.sectionMobile}>
                            <Button
                                onClick={toggleDrawer('right',true)} color="inherit">
                                <MenuIcon />
                            </Button>
                        </div>
                        {/* Drawer Toggler  */}
                        <Drawer anchor="right" open={side.right} 
                        onClose={toggleDrawer('right',false)}
                        >
                        <div
                            tabIndex={0}
                            role="button"

                            // Muted feature because of onClick behavior, always closign every click  in the drawer 
                            onClick={toggleDrawer('right', false)}

                            onKeyDown={toggleDrawer('right', false)}
                        >
                            <SideListNavbar2 class={classes.list} onClick={onModalLogoutClick} />
                        </div>

                        </Drawer>
                        

                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderSettings}
            </div>
        )
    
}

Navbar2.propTypes = {
    classes: PropTypes.object.isRequired,
    //Logout Func from the authActions
    logoutUser: PropTypes.func.isRequired,
    //object prop from the authReducer
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = { logoutUser };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar2)));