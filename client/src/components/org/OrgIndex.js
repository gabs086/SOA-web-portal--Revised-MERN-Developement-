import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import axios from 'axios';

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

import Navbar2 from "../layouts/Navbar2";

// Material UI styles 
const styles = theme => ({
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
    
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

function OrgIndex(props) {
	const classes = props;

	const [orgOnline, setOrgOnline] = useState('');

	useEffect(_ => {
		const { auth } = props;

		axios.get('/api/org/getorgaccnts')
		.then(res => {
			res.data.filter(org => auth.user.username === org.username)
			.map(org => setOrgOnline(org.orgname))
		})
		.catch(err => err)

	},[]);

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
                   	   <ListItem>
                           <ListItemText primary={"Feeds Will be here"} />
                        </ListItem>
                     </List>

                </Container>    

    		 	</Paper>

    		 </Container>




            </div>
        )
}

const mapStateToProps = state => ({
	auth:state.auth
});

export default connect(mapStateToProps)(OrgIndex);
