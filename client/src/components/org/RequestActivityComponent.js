import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";	
import { submitRequest } from '../../actions/requestActivitiesActions';
import { createFormData } from "./formData";
import axios from 'axios';

// Material-ui components 
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Navbar2 from "../layouts/Navbar2";
import RequestActivitiesHistory from './RequestActivitiesHistory';
import FormConfirmationMsg from './FormConfirmationMsg';

//Style component
const useStyles = makeStyles(theme => ({
	 link: {
    display: 'flex',
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

function RequestActivityComponent(props) {

	 const classes = useStyles();

	 // States 
	 	 // Getting the org state
	 const [orgname, setOrgName] = useState('');

	 //Errors state
	 const [errors, getErrors] = useState({});

	 //Open confirmation message state
	 const [open, setOpen] = useState(false)

	 const [obj, setObj] = useState({
	  	file: '',
	  	fileName:''
	 });

	 //Event Handlers

	 // const handleChange = prop => e => {
	 // 	setValues({...values, [prop]: e.target.value });
	 // };

	 // const handleChangeFile = files => {
	 // 	// setFile(files[0]);
	 // 	setObj({...obj, file: files[0]});
	 // 	setFileName(files[0].name);
	 // 	// console.log(e.target.files[0]);
	 // };

	 // Gettin all the values to send in a http request 
	 const handleSubmit = e => {
	 	e.preventDefault();

		const { auth } = props;	 	

		const newRequestActivity = {
			...obj,
			orgname,
			username: auth.user.username,
	  		campus: auth.user.campus
		}

		const _formData = createFormData(newRequestActivity);

		console.log(newRequestActivity);
	 	props.submitRequest(_formData);
	 };

	 const handleClose = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setOpen(false);
          };

	 //Component Effect
	 // Effect to know what org is online
	 useEffect(_ => {
		const { auth } = props;

		const id = setInterval(_ => {

		axios.get('/api/org/getorgaccnts')
		.then(res => {
			res.data.filter(org => auth.user.username === org.username)
			.map(org => setOrgName(org.orgname))
		})
		.catch(err => err)

		}, 2000)

		return _ => {
			clearInterval(id)
		}
		
	},[]);

	 // Error Effects 
	 useEffect(_ => {
	 	if(props.errors)
	 		getErrors(props.errors)
	 },[props.errors]);

	 // useEffect for successful form submition
	 useEffect(_ => {
	 	if(props.requestActivities.submitted)
	 		setOpen(true);
	 },[props.requestActivities.submitted]);


  return (
    <div>

   	<Navbar2 />

   	<FormConfirmationMsg open={open} onClose={handleClose} variant="success" message="Activity Request Submitted" />

      <Container maxWidth="xl" style={{paddingTop: 20}}>

      	<Breadcrumbs aria-label="breadcrumb">
      		<Link color="inherit" href="/org/activitysections" className={classes.link}>
      			<HomeIcon className={classes.icon}/>
      			Menu
      		</Link>

		        <Link
		          color="textPrimary"
		          href="/org/activitysections/requestactivities"
		          aria-current="page"
		          className={classes.link}
		        >
		        <InboxIcon className={classes.icon}/>
		        Activity Request
		        </Link>

      	</Breadcrumbs>

      	<Grid container spacing={2}> 

           {/* Grid for the main  */}
	      	<Grid item xs={12} sm={7}>

			   	<Paper className={classes.paper}>
			   	
			   		 <Typography variant="h5" align="center">
		                 Activity Request Form
		             </Typography>
		              <br></br>

			     		 <Container maxWidth="md">

			     		 		 <Typography variant="h6">
                          		  Input the details needed.
                        		</Typography>

                        		<form noValidate onSubmit={handleSubmit} encType="multipart/form-data">

                        	{/* Activity Title TextField */}
                        		 <TextField
                        		 	value={obj.activity_title}
                        		 	onChange={e => setObj({...obj, activity_title: e.target.value})}
                                    id="activity_title"
                                    name="activity_title"
                                    label="Request Activity Title"
                                    fullWidth
                                    autoComplete="activity_title"
                                />
                                <br />
                                <span style={{ color: "red" }}>
				                        {errors.activity_title}
				                 </span>
                                <br />

                        	{/* File Upload TextField */}
                                <div className={classes.margin}>
							        <Grid container spacing={1} alignItems="flex-end">

							          <Grid item xs={1}>

							          {/* 
							          */}
										<input onChange={e => setObj({...obj, file: e.target.files[0], fileName: e.target.files[0].name})} 
										className={classes.input} id="file" name="file" type="file" />
									      <label htmlFor="file">
									        <IconButton color="primary" aria-label="upload picture" component="span">
									          <CloudUploadIcon />
									        </IconButton>
									     </label>

							          </Grid>

							          <Grid item xs={11}>
							            <TextField 
							            value={obj.fileName}
							            id="input-with-icon-grid"
							            label="File Upload Here"
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

							    <br />

                        	{/* Activity Title TextField */}
								<TextField
									value={obj.description}
									onChange={e => setObj({...obj, description: e.target.value})}
                                    id="description"
                                    name="description"
                                    label="Request Activity Description"
                                    fullWidth
                                    multiline
                                />		
                                <span style={{ color: "red" }}>
				                        {errors.description}
				                 </span>			    

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

			     		 </Container>

			    </Paper>

			 </Grid>

           {/* Grid for the history the org uploads a file for approval */}

			 <Grid item xs={12} sm={5}>

			   	<Paper className={classes.paper}>
			   	
			   		 <Typography variant="h5" align="center">
		                 Your History
		             </Typography>
		              <br></br>

		             <RequestActivitiesHistory />

			    </Paper>

			 </Grid>

	    </Grid>

	  </Container>

    </div>
  )
};

const mapStateToProps = state => ({
  auth:state.auth,
  requestActivities: state.requestActivities,
  errors: state.errors
});

const mapDispatchToProps = { submitRequest };

export default connect(mapStateToProps, mapDispatchToProps)(RequestActivityComponent);