import React, { Component } from 'react';
import Navbar from "../layouts/Navbar";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'

// Material UI styles 
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    
})

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
