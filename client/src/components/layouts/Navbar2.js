import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
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

//Navbar For Students
class Navbar2 extends Component {
    constructor(props) {
        super(props)

        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleActivityOpen = this.handleActivityOpen.bind(this);

        this.handleSettingsClose = this.handleSettingsClose.bind(this);
        this.handleSettingsOpen = this.handleSettingsOpen.bind(this);

        this.state = {
            // L&F Dropdown 
            anchorEl: null,
            //Settings dropdown
            anchorDropDownEl: null
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

    render() {
        const { classes } = this.props;
        const { anchorEl, anchorDropDownEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const isSettingsOpen = Boolean(anchorDropDownEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                close={this.handleMenuClose}
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
                close={this.handleSettingsOpen}
            >
                <MenuItem onClick={this.handleSettingsClose}>Settings Item 1 </MenuItem>
                <MenuItem onClick={this.handleSettingsClose}>Settings Item 2 </MenuItem>
            </Menu>
        )

        return (
            <div className={classes.root}>
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
                            >Activities</Button>
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

Navbar2.proptTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar2);