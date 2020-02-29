import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//Materialize Components
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


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
});

const Transition = props => {
    return <Slide direction="up" {...props} />
}

//Navbar For Students
class Navbar extends Component {
    constructor(props) {
        super(props)

        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleActivityOpen = this.handleActivityOpen.bind(this);

        this.handleSettingsClose = this.handleSettingsClose.bind(this);
        this.handleSettingsOpen = this.handleSettingsOpen.bind(this);

        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.onModalLogoutClick = this.onModalLogoutClick.bind(this);
        this.onHandleLogoutClickClose = this.onHandleLogoutClickClose.bind(this);

        this.state = {
            // L&F Dropdown 
            anchorEl: null,
            //Settings dropdown
            anchorDropDownEl: null,
            //logout modal
            modalLogout: false
        }
    }

    handleActivityOpen(e) {
        this.setState({ anchorEl: e.currentTarget });
    }

    handleMenuClose() {
        this.setState({ anchorEl: null });
    }

    handleSettingsOpen(e) {
        this.setState({ anchorDropDownEl: e.currentTarget });
    }

    handleSettingsClose() {
        this.setState({ anchorDropDownEl: null });
    }

    // Modal Logout Function 
    onModalLogoutClick() {
        this.setState({ modalLogout: true })
        this.setState({ anchorDropDownEl: null });
    }

    onHandleLogoutClickClose() {
        this.setState({ modalLogout: false })
    }

    // Logout Function
    onLogoutClick() {
        this.props.logoutUser();
    }

    render() {
        const { classes } = this.props;
        const { anchorEl, anchorDropDownEl, modalLogout } = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const isSettingsOpen = Boolean(anchorDropDownEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Menu Item 1 </MenuItem>
                <MenuItem onClick={this.handleMenuClose}>Menu Item 2 </MenuItem>
            </Menu>
        );

        const renderSettings = (
            <Menu
                anchorEl={anchorDropDownEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isSettingsOpen}
                onClose={this.handleSettingsClose}
            >
                <MenuItem onClick={this.handleSettingsClose}>Downloadable Files </MenuItem>
                <MenuItem onClick={this.onModalLogoutClick} style={{ color: "red" }}>Logout </MenuItem>
            </Menu>
        )

        return (
            <div className={classes.root}>
                {/* Modal */}
                <Dialog
                    open={modalLogout}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.onHandleLogoutClickClose}
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
                        <Button onClick={this.onHandleLogoutClickClose} variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onLogoutClick} variant="outlined" color="secondary">
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
                            <Button color="inherit">Home</Button>
                            <Button color="inherit">L&F</Button>
                            <Button color="inherit">BatStateU Org Reports</Button>
                            <Button color="inherit">Events</Button>
                            <Button
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleActivityOpen}
                                color="inherit"
                            >Activities
                            <ArrowDropDownIcon />
                            </Button>
                            <Button
                                color="inherit"
                                aria-owns={isSettingsOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleSettingsOpen}
                            >
                                <SettingsIcon />
                            </Button>
                        </div>

                        <div className={classes.sectionMobile}>
                            <Button
                                onClick={this.handleMobileMenuOpen} color="inherit">
                                <MenuIcon />
                            </Button>
                        </div>

                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderSettings}
            </div>
        )
    }
}

Navbar.proptTypes = {
    classes: PropTypes.object.isRequired,
    //Logout Func from the authActions
    logoutUser: PropTypes.func.isRequired,
    //object prop from the authReducer
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(Navbar));