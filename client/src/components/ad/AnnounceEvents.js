import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//Admin Dashboard Component
import DashboardAdmin from '../layouts/DashboardAdmin';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
});

function AnnounceEvents(props){
        const classes = props;
        return (
            <div>
                <DashboardAdmin>
                    <Paper className={classes.root}>
                        Announcement of Events Component Here
                    </Paper>
                </DashboardAdmin>
            </div>
        )
    
}

export default withStyles(styles)(AnnounceEvents);
