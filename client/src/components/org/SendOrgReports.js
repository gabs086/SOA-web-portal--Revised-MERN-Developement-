import React, { useState, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";	
import { submitReport, submitReportFalse } from '../../actions/reportsActions';
import { createFormData } from "./formData";
import axios from 'axios';

// Material-ui components 
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Navbar2 from "../layouts/Navbar2";

//Style component
const useStyles = makeStyles(theme => ({
	 link: {
    display: 'flex',
    textDecoration: 'none',
     color: '#8c8c8c',
      '&:hover': {
   		 textDecoration: 'underline',
     	 }
	  },
	  textPrimary: {
 		display: 'flex',
	    textDecoration: 'none',
	    color: '#737373',
	      '&:hover': {
	   		 textDecoration: 'underline',
	     	 }
	  },
	  icon: {
	    marginRight: theme.spacing(0.5),
	    width: 20,
	    height: 20,
	  },
	     paper: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(0),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
     input: {
    display: 'none',
  },
   margin: {
    margin: theme.spacing(1),
  },
  submit:{
        marginTop: theme.spacing(3),
      },
}));


function SendOrgReports(props){

	const classes = useStyles();

	//State
	const [orgname, setOrgName] = useState('');
	const [errorOrgName, setErrorOrgName] = useState(false);

	const [submitted, setSubmitted] = useState(false);

	//Error handler state
	const [errors, getErrors] = useState({});

	//Reports Body
	const [values, setValues] = useState({
		reportTitle: '',
		reportDesc: '',
		file: null,
		fileName: ''
	});

	//Event Handlers
	 const handleClose = () => {
	    setSubmitted(false);
	    setValues({
	    	reportTitle: '',
			reportDesc: '',
			file: null,
			fileName: ''
	    })
	  };

	const handleSubmit = e => {
		e.preventDefault();

		const { user } = props.auth;

		const newReports = {
			...values,
			orgname,
			campus: user.campus,
			username: user.username
		}		

		//Report body
		let fd = new FormData();
		fd.append('file', values.file);
		fd.append('reportTitle', values.reportTitle);
		fd.append('reportDesc', values.reportDesc);
		fd.append('orgname', orgname);
		fd.append('campus', user.campus);
		fd.append('username', user.username);

		//orgFeed body
		const newOrgFeed = { 
			username: user.username,
			orgname,
			reportTitle: values.reportTitle,
			reportDesc: values.reportDesc
		}

		// console.log(newOrgFeed);

		// console.log(newReports);
		props.submitReport(fd, newOrgFeed);


	}
	//Component effect
	// Effect to know what org is online
	 useEffect(_ => {
		const { auth } = props;

		axios.get('/api/org/getorgaccnts')
		.then(res => res.data.filter(org => auth.user.username === org.username).map(org => setOrgName(org.orgname)))
		.catch(err => {
			// if(err.request)
			// 	setErrorOrgName(true)
			console.log(err);
		});

	},[]);

	 useEffect(_ => {
	 	if(props.reports.submitted)
	 		setSubmitted(true)

		setTimeout(function () {
			props.submitReportFalse()
		}, 6000)

	 },[props.reports.submitted]);

	  // Component Effect for the errors
     useEffect(_ => {
          if(props.errors)
              getErrors(props.errors)
        },[props.errors]);

	return (
			<div>
				<Navbar2 />

				 <Dialog
			        open={submitted}
			        onClose={handleClose}
			        aria-labelledby="alert-dialog-title"
			        aria-describedby="alert-dialog-description"
			      >
			        <DialogTitle id="alert-dialog-title">{"Send an organizational report"}</DialogTitle>
			        <DialogContent>
			          <DialogContentText id="alert-dialog-description">
			            You've archived your reports to the admin successfully
			          </DialogContentText>
			        </DialogContent>
			        <DialogActions>

			          <Button onClick={handleClose} color="primary">
			            OK
			          </Button>


			        </DialogActions>
			      </Dialog>

			 		<Container maxWidth="xl" style={{paddingTop: 20}}>

			 		<Breadcrumbs aria-label="breadcrumb">
			      		<Link to="/org/activitysections" className={classes.link}>
			      			<HomeIcon className={classes.icon}/>
			      			Menu
			      		</Link>

					        <Link
					          to={' '}
					          aria-current="page"
					          className={classes.textPrimary}
					        >
					        <InboxIcon className={classes.icon}/>
					        Archived
					        </Link>

			      	</Breadcrumbs>

			      	    	<Grid container spacing={2}> 


					      	    		<Grid item xs={2}>
					      	    		</Grid>

					      	    		<Grid  item xs={8}>
			      	    					<Paper className={classes.paper}>
			      	    					{
			      	    						errorOrgName
			      	    						?
			      	    						<Typography variant="h6" align="center">
					                          		  Something went wrong. Please refresh the page.
					                        		</Typography>
			      	    						:
			      	    						<Fragment>
			      	    							
			      	    							 <Typography variant="h6">
					                          		  Input the details needed.
					                        		</Typography>

					                        		<form noValidate onSubmit={handleSubmit}>

					                        		 <TextField
					                        		 	onChange={e => setValues({...values, reportTitle: e.target.value}) }
					                        		 	value={values.reportTitle}
					                                    id="reportTitle"
					                                    name="reportTitle"
					                                    label="Title of your report"
					                                    fullWidth
					                                    autoComplete="reportTitle"
					                                />
					                                <br />
								                      <span style={{ color: "red" }}>
			                                               {errors.reportTitle}
			                                         </span>
					                                <br />

					                                 <TextField
					                        		 	onChange={e => setValues({...values, reportDesc: e.target.value}) }
					                               		value={values.reportDesc}
					                                    id="reportDesc"
					                                    name="reportDesc"
					                                    label="Description of your report"
					                                    fullWidth
					                                    autoComplete="reportDesc"
					                                    multiline
					                                />
					                                   <span style={{ color: "red" }}>
			                                               {errors.reportDesc}
			                                         </span>

					                                {/* File Upload TextField */}
							                                <div className={classes.margin}>
														        <Grid container spacing={1} alignItems="flex-end">

														          <Grid item xs={1}>

														          {/* 
														          	 onChange={e => setObj({...obj, file: e.target.files[0], fileName: e.target.files[0].name})
														          */}
																	<input onChange={e => setValues({...values, file: e.target.files[0], fileName: e.target.files[0].name}) }
																	className={classes.input} id="file" name="file" type="file" />
																      <label htmlFor="file">
																        <IconButton color="primary" aria-label="upload picture" component="span">
																          <CloudUploadIcon />
																        </IconButton>
																     </label>

														          </Grid>

														          <Grid item xs={11}>
														            <TextField 
														            value={values.fileName}
														            id="input-with-icon-grid"
														            label="Enter your report here"
														            helperText="Note: .docx and .pdf file types only"
														            fullWidth
														              InputProps={{
							                                               readOnly: true,
							                                              }}
							                                           InputLabelProps={{
							                                           		shrink: true,
							                                           }}
														            />

														          

															  	
														            {/*
														        Native Input file for

														        <input type="file" name="file" value={fileName} onChange={handleChangeFile}/>
														
														               	*/ }
														        

														        </Grid>
														        </Grid>

														      
														    </div> 

														 <span style={{ color: "red" }}>
			                                               {errors.file}
			                                         </span>

														    <br/>
					                        		<span>*** Please double check everythin before you submit</span>

					                        			<Button
							                                type="submit"
							                                fullWidth
							                                variant="contained"
							                                color="primary"
							                                className={classes.submit}
								                            >
								                                submit
								                            </Button>
					                        		</form>


			      	    						</Fragment>
			      	    					}
								      	    		
								     		 		
								      	    </Paper>	
					      	    		</Grid>

					      	    		<Grid item xs={2}>
					      	    		</Grid>


			      	    	</Grid>


			 		</Container>
			</div>
		);
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	reports: state.reports
});

const mapDispatchToProps = { submitReport, submitReportFalse };

export default connect(mapStateToProps, mapDispatchToProps)(SendOrgReports);