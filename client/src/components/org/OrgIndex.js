import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getOrgFeeds } from '../../actions/requestActivitiesActions';
import axios from 'axios';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';

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

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

function OrgIndex(props) {
	const classes = useStyles();

  // States
	const [orgOnline, setOrgOnline] = useState('');
  //Loading state for the 
  const [loadingOrgFeeds, setOrgFeeds] = useState(true);

  // Event Handlers

  // Component Effects 
	useEffect(_ => {
		const { auth } = props;

    // const id = setInterval(_ => {
          axios.get('/api/org/getorgaccnts')
        .then(res => {
          res.data.filter(org => auth.user.username === org.username)
          .map(org => setOrgOnline(org.orgname))
        })
        .catch(err => err)

    // },2000)

    // return _ => {
    //   clearInterval(id)
    // }
		
	},[]);

  // Effect for rendering the org feeds
  useEffect(_ => {

    const id = setInterval(_ => {
        props.getOrgFeeds();
        setOrgFeeds(false);
    }, 2000)

    return _ => {
      clearInterval(id)
    }

  },[])

  const { auth, requestActivities } = props;

  const rows = requestActivities.feeds.sort((a, b) => a.created_at > b.created_at ? -1 : 1)
    .filter(row => row.username === auth.user.username);

        return (
            <div>
                <Navbar2 />

    		 <Container style={{paddingTop: 20}}>

    		 	<Paper className={classes.root} elevation={10} >

    		 	<Container style={{paddingTop: 20}}>

    		 		<Typography variant="h5" component="h3">
    		 			WELCOME <span style={{color: 'red'}}> {orgOnline} </span> TO SOA STUDENT ORGANIZATION DASHBOARD
    		 		</Typography>
    		 		<br/>

    		 		<Typography component="p">
                    In this Student Web Portal, You can :
                    </Typography>

                    <div className={classes.root}>

                    	<List component="nav">

                       	 {/* Link 1  */}
                       	 <ListItemLink href="/org">
                       	 	 <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                        	<ListItemText primary="View Calendar of Events" />
                       	 </ListItemLink>

							 {/* Link 2  */}
                       	 <ListItemLink href="/org/activitysections">
                       	 	 <ListItemIcon>
                       	 	 	<AssignmentIcon />
                            </ListItemIcon>
                        	<ListItemText primary="Send Activity Request and Reports to your SOA Head and the SOA Director" />
                       	 </ListItemLink>   

                       	 	 {/* Link 3  */}
                       	 <ListItemLink href="#">
                       	 	 <ListItemIcon>
                                <AssessmentIcon />
                            </ListItemIcon>
                        	<ListItemText primary="Create Activities for the students to register in the portal" />
                       	 </ListItemLink>         	 

                    	</List>
                    	
                    </div>

                     <center style={{paddingBottom: 20}}>
		                <Button variant="outlined" color="secondary" className={classes.button}>
		                    Learn More...
		                </Button>
               		 </center>

    		 	</Container>

    		 	</Paper>

    		 	<br/>

    		 	<Paper className={classes.root} elevation={5} style={{paddingTop: 20}}>

    		 	<Container style={{paddingTop: 20}}>

    		 		<Typography component="p">
                    	Your Actitvites:
                    </Typography>


                    <List component="nav" aria-label="secondary mailbox folders">
                   	  
                       {
                        loadingOrgFeeds 
                        ? 
                          <Fragment>
                             <ListItem>
                              <CircularProgress color="secondary" />
                             <ListItemText primary={"Your Feeds is loading."} />
                             </ListItem>
                          </Fragment>
                        :
                        <Fragment>
                             { 

                              rows.length === 0
                              ?
                            <ListItem>

                               <ListItemText primary={"The organization dont have feed yet."} />
                            </ListItem>

                              :
                              rows.map(row => (
                              <Fragment>  
                                  <ListItem>
                                       <ListItemText>
                                       {row.message}
                                       <span className={classes.timeFeed}>
                                       {moment(row.created_at).fromNow()}
                                       </span>
                                       </ListItemText>
                                   </ListItem>
                               </Fragment>
                                ))
                            }
                        </Fragment>

                       }
                     </List>

                </Container>    

    		 	</Paper>

    		 </Container>




            </div>
        )
}

const mapStateToProps = state => ({
	auth:state.auth,
  requestActivities: state.requestActivities
});

const mapDispatchToProps = { getOrgFeeds };

export default connect(mapStateToProps, mapDispatchToProps)(OrgIndex);
