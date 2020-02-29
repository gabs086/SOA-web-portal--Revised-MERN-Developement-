import React, { useState } from 'react';
import clsx from 'clsx';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

//Redux components
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

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
                {/* Item List 1 */}
                <List>

                    <ListItem button>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText>List 1</ListItemText>
                    </ListItem>

                </List>

                <Divider />

                {/* Item List 2 */}
                <List>
                    <ListItem button>
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText>List 2</ListItemText>
                    </ListItem>
                </List>
                <Divider />

                {/* Item List 2 */}
                <List>
                    <ListItem button onClick={onModalLogoutClick}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
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


