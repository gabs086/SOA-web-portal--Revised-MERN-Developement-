import React from 'react';

// Material Ui Components 
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//Dashboard component
import DashBoardHead from '../layouts/DashboardHead';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
});

function AnnounceEvents(props) {

    const classes = props;
    return (
        <DashBoardHead>
            <Paper className={classes.root}>
                Announcing of Event component here
            </Paper>
        </DashBoardHead>
    )
}

export default withStyles(styles)(AnnounceEvents);