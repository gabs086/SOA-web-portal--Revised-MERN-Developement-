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

function HeadIndex(props){

    const classes = props;
        return (
            <div>
                <DashBoardHead>
                     <Paper className={classes.root}>
                        
                     </Paper>
                </DashBoardHead>
            </div>
        )
}

export default withStyles(styles)(HeadIndex);
