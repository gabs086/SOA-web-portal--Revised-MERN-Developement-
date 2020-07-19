import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import Navbar2 from "../layouts/Navbar2";

// Material UI styles 
const useStyles = makeStyles(theme => ({
  root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
   root2:{
   	 width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
},
 inline: {
    display: 'inline',
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
    },
    preloader: {
    	textAlign: 'center',
    	marginTop: 40,
    }
}));

function OrgNotifications(props) {

	const classes = useStyles();

	//States ++++++++++++
	const [notifs, getNotifs] = useState([]);

	const [notifLoading, setNotifLoading] = useState(true);

	//Event Handlers +++++++++

	//Component Effect +++++++++++

	useEffect(_ => {
		axios.get('/api/requestactivities/getorgnotifications')
		.then(res => {
			getNotifs(res.data);
			setNotifLoading(false);
		})
		.catch(err => console.log(err));

	},[]);

	const { auth } = props;

	const rows = notifs.sort((a,b) => (a.created_at > b.created_at ? -1 : 1))
		.filter(row => row.username === auth.user.username);


  return (
    <Fragment>
    		
    	<Navbar2 />

    	<Container style={{paddingTop: 20}}>

    		<Paper className={classes.root} elevation={10}>
    			
    			<Typography variant="h5" component="h3">
    		 		Organizations Notifications
    		 	</Typography>
				
				<List className={classes.root}>


    		 	{
    		 		notifLoading 
    		 		?
    		 		<Fragment>
    		 		<div className={classes.preloader}>
    		 		 <CircularProgress color="secondary" size={60}/>
                    	<br/>
                    <span>Loading ...</span>
    		 		</div>
    		 		</Fragment>
    		 		:
    		 		<Fragment>
    		 		{
    		 			rows.length === 0
    		 			?
    		 			<Fragment>
					          <ListItem alignItems="flex-start">
					          		
					          	<span style={{textAlign: 'center'}}>
					          		No notifications available...
					          	</span>
					         	
					          </ListItem>
					      
					          <Divider variant="inset" component="li" />
    		 			</Fragment>

    		 			:
    		 			<Fragment>
    		 			{
    		 				rows.map(row => (
    		 					<Fragment>
					          <ListItem alignItems="flex-start">
					          
					            <ListItemText
					              primary={row.notification}
					              secondary={
					                <Fragment>
					                {
					                	row.reason 
					                	?
					                	<Fragment>
					                	<Typography
						                component="span"
						                variant="body2"
						                className={classes.inline}
						                color="textPrimary"
						              >
						                <span style={{color: 'red'}}>
						                Reason
						                </span>: {row.reason}
						              </Typography>
					                  {` - ${moment(row.created_at).fromNow()}`}

						              </Fragment>
						              :
						              <Fragment>
					                  {moment(row.created_at).fromNow()}
						              </Fragment>
					                }
					                
					                </Fragment>
					              }
					            />
					          </ListItem>
					      
					          <Divider variant="inset" component="li" />

					          </Fragment>
    		 			))
    		 			}
    		 			
    		 		</Fragment>
    		 		}
    		 		</Fragment>
    		 	}
			</List>
    		 	


    		</Paper>

    	</Container>

    </Fragment>
  )
}

const mapStateToProps = state => ({
	auth: state.auth
});



export default connect(mapStateToProps)(OrgNotifications);
