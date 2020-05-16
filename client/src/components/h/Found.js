import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import FindReplaceIcon from '@material-ui/icons/FindReplace';

// Dashboard Component  
import DashBoardHead from '../layouts/DashboardHead';

const styles = theme => ({	
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    link: {
    display: 'flex',
  },
   icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
});

const Found = (props) => {
	const classes = props;
  return (
     <DashBoardHead>

      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/h/lostandfound" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Menu
        </Link>

        <Link
          color="textPrimary"
          href="/h/lostandfound/foundreports"
          aria-current="page"
        >
        <FindReplaceIcon className={classes.icon}/>
          Lost Reports
        </Link>
    </Breadcrumbs>

         <Paper className={classes.root}>
                Found Reports Component here 
         </Paper>
     </DashBoardHead>
  )
}

export default withStyles(styles)(Found);