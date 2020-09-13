import React, { useState, useEffect, useMemo, forwardRef} from 'react';
import { connect } from 'react-redux';
import { Link as Router } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ShareIcon from '@material-ui/icons/Share';
import ViewListIcon from '@material-ui/icons/ViewList';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

//Admin Dashboard Component
import DashboardAdmin from '../layouts/DashboardAdmin';

const LinkRouter = (props) => <Link {...props} component={Router} />;

const useStyles = makeStyles(theme => ({
	 root: {
        display: 'flex',
        flexWrap: 'wrap',
         ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },

      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
      closeIcon: {
          float: 'right',
          color: 'red'
      },
      formControl: {
        // margin: theme.spacing.unit,
        minWidth: '100% ',
        paddingBottom: 20
      },
      submit:{
        marginTop: theme.spacing(3),
      },
      close: {
          padding: theme.spacing() / 2,
      },
     link: {
	    display: 'flex',
	  },
   icon: {
     marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
    input: {
    display: 'none',
  },
   margin: {
    margin: theme.spacing(1),
  },
  breadcrumb: {
  	paddingBottom: 20
  },
  button: {
  	paddingBottom: 20
  }
}));

function ShareFiles(props) {

	const classes = useStyles();

	//State
	const [obj, setObj] = useState({
		file: null,
		fileName: '',
		stud: ''
	});

	//Event Handlers
	const handleSubmit = e => {
		e.preventDefault();

		console.log(obj);
	}

	//Component Effect

  return (
    <div>
    	<DashboardAdmin>

    		<Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
			      	 <LinkRouter className={classes.link} color="inherit" to="/">
			      	 <ViewListIcon classes={classes.icon} />
	                  Menu
	                </LinkRouter>

	                <LinkRouter className={classes.link} color="textPrimary" to="/">
	                <ShareIcon classes={classes.icon} />
	                  Share Files
	                </LinkRouter>

			      	</Breadcrumbs>

			      	<Button color="secondary" variant="outlined">
			      		View List
			      	</Button>
			      	<br />
			      	<br />
			      	

		    	<Paper className={classes.root}>

		    		<Grid container spacing={2}> 


					      	    		<Grid item xs={2}>
					      	    		</Grid>

					      	    		<Grid  item xs={8}>
			      	    				
				      	    							
			      	    							 <Typography variant="h6">
					                          		  Input the details needed.
					                        		</Typography>

					                        		<form noValidate onSubmit={handleSubmit}>

					                                {/* File Upload TextField */}
							                                <div className={classes.margin}>
														        <Grid container spacing={1} alignItems="flex-end">

														          <Grid item xs={1}>

														          {/* 
														          	 onChange={e => setObj({...obj, file: e.target.files[0], fileName: e.target.files[0].name})
														          */}
																	<input onChange={e => setObj({...obj, file: e.target.files[0], fileName: e.target.files[0].name}) }
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
														            label="Enter the file here"
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


														    <FormControl className={classes.formControl}>
														        <InputLabel id="demo-simple-select-helper-label">Who will recieve the files</InputLabel>
														        <Select
														         onChange={e => setObj({...obj, stud: e.target.value})}
														         value={obj.stud}
														          labelId="demo-simple-select-helper-label"
														          id="demo-simple-select-helper"
														        >
														          <MenuItem value="">
														            <em>None</em>
														          </MenuItem>
														          <MenuItem value={"student"}>Students</MenuItem>
														          <MenuItem value={"org"}>Student Organizations</MenuItem>
														        </Select>
														      </FormControl>

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


								      	    		
								     		 		
					      	    		</Grid>

					      	    		<Grid item xs={2}>
					      	    		</Grid>


			      	    	</Grid>
		    		
		    	</Paper>

    	</DashboardAdmin>
    </div>
  )
}

export default ShareFiles;