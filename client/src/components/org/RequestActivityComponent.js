import React, { Fragment, useState } from 'react';

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
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Navbar2 from "../layouts/Navbar2";
import RequestActivitiesHistory from './RequestActivitiesHistory'

//Style component
const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3, 2),
	},
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
	 const [values, setValues] = useState({
	 		activity_title: '',
	 		file: '',
	 		request_description: '',
	 });

	 //Event Handlers

	 const handleChange = prop => e => {
	 	setValues({...values, [prop]: e.target.value })
	 }

	 const handleSubmit = e => {
	 	e.preventDefault();

	 	console.log(values);
	 };

	 //Component Effect

  return (
    <Fragment className={classes.root}>
    		
   	<Navbar2 />

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

                        		<form noValidate onSubmit={handleSubmit}>

                        	{/* Activity Title TextField */}
                        		 <TextField
                        		 	value={values.activity_title}
                        		 	onChange={handleChange('activity_title')}
                                    id="activity_title"
                                    name="activity_title"
                                    label="Request Activity Title"
                                    fullWidth
                                    autoComplete="activity_title"
                                />
                                <br />
                                <br />

                        	{/* File Upload TextField */}
                                <div className={classes.margin}>
							        <Grid container spacing={1} alignItems="flex-end">

							          <Grid item xs={1}>

								  		<input value={values.file} onChange={handleChange('file')} className={classes.input} id="icon-button-file" type="file" />
									      <label htmlFor="icon-button-file">
									        <IconButton color="primary" aria-label="upload picture" component="span">
									          <CloudUploadIcon />
									        </IconButton>
									     </label>

							          </Grid>

							          <Grid item xs={11}>
							            <TextField 
							            value={values.file}
							            id="input-with-icon-grid"
							            label="File Upload Here"
							            fullWidth
							              InputProps={{
                                               readOnly: true,
                                              }}
                                           InputLabelProps={{
                                           		shrink: true,
                                           }}
							            />

							          </Grid>

							        </Grid>

							        {/*
							        Native Input file for
							        <input type="file" value={file} onChange={handleChange}/>
							       	*/ }
							    </div>

							    <br />

                        	{/* Activity Title TextField */}
								<TextField
									value={values.request_description}
									onChange={handleChange('request_description')}
                                    id="request_description"
                                    name="request_description"
                                    label="Request Activity Description"
                                    fullWidth
                                    multiline
                                />					    

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

    </Fragment>
  )
}

export default RequestActivityComponent;