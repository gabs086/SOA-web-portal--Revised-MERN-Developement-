import React, { Fragment, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Navbar2 from "../layouts/Navbar2";

// Material UI styles 
const useStyles = makeStyles(theme => ({
  root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
      },
    input: {
        display: 'none',
      },
    timeFeed: {
      float: 'right',
      fontSize: 13
    }
}));

function OrgNotifications(props) {

	const classes = useStyles();

	//States ++++++++++++
	const [notifs, getNotifs] = useState([]);

	//Event Handlers +++++++++

	//Component Effect +++++++++++

	// useEffect(_ => {
	// 	axios.get()
	// },[])

  return (
    <Fragment>
    		
    	<Navbar2 />

    	<Container style={{paddingTop: 20}}>

    		<Paper className={classes.root} elevation={10}>
    			
    			<Typography variant="h5" component="h3">
    		 		Organizations Notifications
    		 	</Typography>

    		</Paper>

    	</Container>

    </Fragment>
  )
}

export default OrgNotifications;