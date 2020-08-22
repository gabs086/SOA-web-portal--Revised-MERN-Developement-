import React, { Fragment, useEffect, useState} from 'react';
import { connect } from "react-redux";
import { registerStudentFalse } from '../../actions/registeredStudentsActions';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Navbar from "../layouts/Navbar";

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
    },
      nested: {
        paddingLeft: theme.spacing(4),
      },
}));

function Activities(props) {

	const classes = useStyles();

	//State
	const [records, getRecords] = useState([]);
	const [loading, setLoading] = useState(true);

	const [open,] = useState(true);

	//If theres a error state
	const [ifError, setIfError] = useState(false);

	 //Campus Fetching State
     const [campuses, getCampuses] = useState([]);
     const [loadingCampuses, setLoadingCampuses] = useState(true);

      //Search State
      const [searchCampus, setSearchCampus] = useState('');
      const [searchAct, setSearchAct] = useState('');

    //Confirmation state
    const [openConfirmation, setOpenConfirmation] = useState(false);

	//Event Handlers
  const handleClose = _ => {
    props.registerStudentFalse();
    setOpenConfirmation(false);
  }

	//Component Effect
	useEffect(_ => {
		axios.get('/api/assessments/')
		.then(res => {
			getRecords(res.data);
			setLoading(false);
		})
		.catch(err => {
			if(err)
				setIfError(true)
		})
	},[props.registeredStudents.registered]);

	 useEffect( _ => {

            // const id = setInterval( _ => {
                (async _ => {
                    const res = await axios.get('/api/campuses');
                    getCampuses(res.data);
                    setLoadingCampuses(false)
                })();
            // }, 2000)

            // return _ => {
                // clearInterval(id);
            // }

        },[]);

   useEffect(_ => {
      if(props.registeredStudents.registered)
          setOpenConfirmation(true)

   },[props.registeredStudents.registered])

	const rows =  records.filter(row => row.status === 'approved')
	// console.log(rows);

  return (
    <div>
    	<Navbar />

    		<Container style={{paddingTop: 20}}>

        <Dialog
        open={openConfirmation}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Activity joined successfully"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Activity joined successfully, We will notify you on your mobile number for any update. Please be always aware.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>



    		 	<Paper className={classes.root} elevation={10} >
    		 	<Typography variant="h5" component="h3">
                    Check Activities to partipate with:
                  </Typography>
                    
                    <br/>

           	
           	 <div  style={{paddingBottom: 10}}>
                 <Grid container spacing={3}>

           	 	 <Grid item xs={12} sm={6}>
                         <FormControl fullWidth>
                                  <TextField
                                      id="standard-select-currency-native"
                                      select
                                      label="Search by campus"
                                      value={searchCampus}
                                      onChange={e => setSearchCampus(e.target.value)}
                                      SelectProps={{
                                        native: true,
                                      }}
                                    >
                                      {   loadingCampuses 
                                      ?
                                          <option></option> 
                                          :

                                          <Fragment>
                                              <option></option>
                                              {campuses.map((campus,id) => {
                                                return(
                                                <option key={id} value={campus.campusname}>{campus.campusname}</option>
                                                )
                                              })}
                                          </Fragment>
                                      }
                                    </TextField>
                            </FormControl>
                      </Grid>

                       <Grid item xs={12} sm={6}>
  							 <TextField
                                id="searchAct"
                                name="searchAct"
                                label="Search by Activity"
                                fullWidth
                                className="classes.formControl"
                                value={searchAct}
                                autoComplete="searchDept"
                                onChange={e => setSearchAct(e.target.value)}
                             />
                       </Grid>
                </Grid>

                </div>
                		{
                			loading
                			?
                			<center>
                			 <CircularProgress color="secondary" /><br/>
                                        <span>Loading ...</span>
                			</center>
                			:
                			<Fragment>	
                				 {
                				 	ifError
                				 	?
                				 	<span>
                				 	There's a error, Please reload the page again...
                				 	</span>
                				 	: 
                				 	<Fragment>
                				 		{
                				 			searchCampus === '' && searchAct === ''
                				 			?

                				rows.map(row => (
		                    			<Fragment>
		                    			  <ListItem button>
					                       	 <ListItemText primary={row.activity} />
		                       			 </ListItem>
		                       			 <Collapse in={open} timeout="auto" unmountOnExit>
		                       			 <div className={classes.nested}>
		                       			 		<p>
								                   	<Typography component="span" color="textSecondary">
								                   		About the activity:
								                   	</Typography> &nbsp;
								                   	{row.description}
								                   	</p>
							                   	<p>
								                   	<Typography component="span" color="textSecondary">
								                   		Campus:
								                   	</Typography> &nbsp;
								                   	{row.campus}
								                   	</p>
							                   	<p>

							                   	<Typography component="span" color="textSecondary">
							                   	Requirements to join:
							                   	</Typography> &nbsp;
							                   	{row.activityRequirements}
							                   	</p>
							                   	<p>
							                   	 	<Typography component="span" color="textSecondary">
							                   			Date: 
		    										</Typography>&nbsp;
							                   		{row.date}
							                   	</p>

							                   	       <Button 
								                        href={`/st/activities/${row.id}/${row.activity}`}
								                        className={classes.button}
								                        variant="outlined" 
								                        color="primary"
								                        >
								                        Join Activity
								                    </Button>

					                   	</div>
		                        		</Collapse>
		                    		</Fragment>
                    		))
                				 			:
			                			rows.filter(row => row.activity.toLowerCase().search(searchAct.toLowerCase()) !== -1 && row.campus === searchCampus)
			                			.map(row => (
			                    		<Fragment>
			                    			  <ListItem button>
						                       	 <ListItemText primary={row.activity} />
			                       			 </ListItem>
			                       			 <Collapse in={open} timeout="auto" unmountOnExit>
			                       			 <div className={classes.nested}>
			                       			 		<p>
									                   	<Typography component="span" color="textSecondary">
									                   		About the activity:
									                   	</Typography> &nbsp;
									                   	{row.description}
									                   	</p>
								                   	<p>
									                   	<Typography component="span" color="textSecondary">
									                   		Campus:
									                   	</Typography> &nbsp;
									                   	{row.campus}
									                   	</p>
								                   	<p>

								                   	<Typography component="span" color="textSecondary">
								                   	Requirements to join:
								                   	</Typography> &nbsp;
								                   	{row.activityRequirements}
								                   	</p>
								                   	<p>
								                   	 	<Typography component="span" color="textSecondary">
								                   			Date: 
			    										</Typography>&nbsp;
								                   		{row.date}
								                   	</p>

								                   	       <Button 
									                         href={`/st/activities/${row.id}/${row.activity}`}
									                        className={classes.button}
									                        variant="outlined" 
									                        color="primary"
									                        >
									                        Join Activity
									                    </Button>

						                   	</div>
			                        		</Collapse>
			                    		</Fragment>
			                    		))

                				 		}
                				 	</Fragment>
                				 }
                			</Fragment>
                		}


              
    		 	</Paper>

    		 </Container>


    </div>
  )
}

const mapStateToProps = state => ({
  registeredStudents: state.registeredStudents,
});

const mapDispatchToProps = { registerStudentFalse };

export default connect(mapStateToProps, mapDispatchToProps)(Activities);