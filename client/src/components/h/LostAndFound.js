import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import DashBoardHead from '../layouts/DashboardHead';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
});

function LostAndFound(props) {
    const classes = props;
    return (
        <DashBoardHead>
            <Paper className={classes.root}>
                Lost and Found Component will be here
            </Paper>
        </DashBoardHead>
    )
}

export default withStyles(styles)(LostAndFound);
