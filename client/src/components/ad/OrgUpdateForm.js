import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axios from 'axios';
import { updateOrgDesc } from '../../actions/orgDescActions';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ViewListIcon from '@material-ui/icons/ViewList';

//Admin Dashboard Component
import DashboardAdmin from '../layouts/DashboardAdmin';
import OrgUpdateFormErrorMsg from './OrgUpdateFormErrorMsg';

// Object Styles for the components 
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
         ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
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
});

function OrgAddForm(props){

	const classes = props;

	//////////States///////////

	// Getting the data of campuses 
	const [campuses, getCampuses] = useState([]);
	const [loadingCampuses, setLoadingCampuses] = useState(true);

	// Value States
	const [campus, setCampus] = useState('');
	const [department, setDept] = useState('');
	const [orgname, setOrgName] = useState('');
	const [orgpresname, setOrgPresName] = useState('');
	const [orgadvisername, setOrgAdviserName] = useState('');
	const [quantitymembers, setQuantityMembers] = useState('');
	const [quantityofficers, setQuantityOfficers] = useState('');
	const [description, setDescription] = useState('');

	// Error MSG state
	const [errors, getErrors] = useState({}); 
	const [errorAll, setErrorAll] = useState(false);

	////////////Event Handlers//////////////
	// For campus State 
	const handleCampus = e => {
	    setCampus(e.target.value);
	};

	const handleDept = e => {
		setDept(e.target.value);
	};

	const handleOrgName = e => {
		setOrgName(e.target.value)
	};

	const handleOrgPresName = e => {
		setOrgPresName(e.target.value)
	};

	const handleOrgAdviserName = e => {
		setOrgAdviserName(e.target.value)
	};

	const handleQuantityMembers = e => {
		setQuantityMembers(e.target.value);
	};

	const handleQuantityOfficers = e => {
		setQuantityOfficers(e.target.value);
	};

	const handleDescription = e => {
		setDescription(e.target.value)
	};

	const handleSubmit = e => {
		e.preventDefault();

		const newOrgRecord = {
			campus,
			department,
			orgname,
			orgpresname,
			orgadvisername,
			quantitymembers,
			quantityofficers,
			description

		};

		// props.addOrgDesc(newOrgRecord);

		props.updateOrgDesc(props.match.params.id,newOrgRecord)
	};

	 const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorAll(false);
  };

	///////////////Component Effects///////////////

	// Effect for loading the campuses 
	useEffect( _ => {
		const id = setInterval( _ => {
			(async _ => {
				const res = await axios.get('/api/campuses');
				 getCampuses(res.data);
	   			 setLoadingCampuses(false);
			})();
		}, 2000)

		return _ => {
			clearInterval(id);
		}
	},[]);

	// useEffect for getting the data with its specific param id
	useEffect( _ => {

			(async _ => {
				const res = await axios.get(`/api/orgdesc/getorgdesc/${props.match.params.id}`);
					setCampus(res.data.campus);
					setDept(res.data.department);
					setOrgName(res.data.orgname);
					setOrgPresName(res.data.orgpresname);
					setOrgAdviserName(res.data.orgadvisername);
					setQuantityMembers(res.data.quantitymembers);
					setQuantityOfficers(res.data.quantityofficers);
					setDescription(res.data.description);
			})();
	},[]);

	//useEffect for getting the errors
	useEffect( _ => {
		if(props.errors){
			getErrors(props.errors)
		}

		if(props.errors.all){
			setErrorAll(true)
		}
	},[props.errors]);

	// useEffect for a successfull adding of organization 
	useEffect( _ => {
		if(props.orgDesc.updated){
			props.history.push('/ad/organizationlist');	
		}
	},[props.orgDesc.updated]);

	return (
		 <DashboardAdmin>

		 <OrgUpdateFormErrorMsg open={errorAll} onClose={handleClose} errMsg={errors.all}  />

		 	<Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
		        <Link color="inherit" href="/ad/organizationlist" className={classes.link}>
		          <ViewListIcon className={classes.icon} />
		          Menu
		        </Link>

		        <Link
		          color="textPrimary"
		          href={"/ad/organizationlist/updaterecord/" + props.match.params.id}
		          aria-current="page"
		          className={classes.link}
		        >
		        <ListAltIcon className={classes.icon} />
		          Add
		        </Link>
		    </Breadcrumbs>

		    	<div className={classes.root}>

		    		<main className={classes.layout}>

	                    <Paper 
	                    className={classes.paper} 
	                    style={{ paddingTop: '10px', paddingBottom:'30px'}}
	                    >
		                     <Typography variant="h4" align="center">
	                            Organization Registration Form
	                        </Typography>
                        <br></br>

                        <Container maxWidth="md">

                        	<Typography variant="h6">
	                            Input the details needed.
	                        </Typography>

	                        {/* Whole Form Component */}	
	                        <form noValidate onSubmit={handleSubmit}>
	                        	<Grid container spacing={3}>
	                        		{/* Whole Form Component */}	
	                        		<Grid item xs={12} sm={6}>
	                        			<FormControl fullWidth className={classes.formControl}>

	                        				<InputLabel htmlFor="campus-simple">Campus</InputLabel>

	                        				<Select
	                        					value={campus}
	                        					onChange={handleCampus}

	                        					inputProps={{
	                        						name: 'campus',
	                        						id:'campus-simple'
	                        					}}
	                        				>
	                        				{
	                        					loadingCampuses ? 
	                        					     <MenuItem></MenuItem>
	                        					     :
	                        					 campuses.map((campus, id) => {
	                        					 	return <MenuItem key={id} value={campus.campusname}>{campus.campusname} </MenuItem>
	                        					 })
	                        				}
	                        				</Select>

	                        			</FormControl>

	                        			  <span style={{ color: "red" }}>
				                                {errors.campus}
				                          </span>

	                        		</Grid>
	                        		{/* Whole Form Component */}	
	                        		<Grid item xs={12} sm={6}>
	                        			<TextField 
	                        			value={department}
	                        			onChange={handleDept}
	                        			id="department"
	                        			name="department"
	                        			label="Department"
	                        			fullWidth
	                        			autoComplete="department"
	                        			/>
	                        			<span style={{ color: "red" }}>
				                                {errors.department}
				                          </span>
	                        		</Grid>

	                        	{/*	Organization Name */}
	                        	<Grid item xs={12}>
	                        		<TextField 
	                        		value={orgname}
	                        		onChange={handleOrgName}
	                        		id="orgname"
	                        		name="orgname"
	                        		label="Organization Name"
	                        		fullWidth
	                        		autoComplete="orgname"
	                        		/>
	                        		<span style={{ color: "red" }}>
				                           {errors.orgname}
				                       </span>
	                        	</Grid>

	                        	{/*	Organization Adviser Name */}
	                        		<Grid item xs={12}>
	                        			<TextField 
	                        				value={orgpresname}
	                        				onChange={handleOrgPresName}
	                        				id="orgpresname"
	                        				name="orgpresname"
	                        				label="Organization Pres. Name"
	                        				fullWidth
	                        				autoComplete="orgpresname"
	                        			/>
	                        			<span style={{ color: "red" }}>
				                                {errors.orgpresname}
				                          </span>
	                        		</Grid>

	                        	{/*	Organization Adviser Name */}
	                        		<Grid item xs={12}>
	                        			<TextField 
	                        				value={orgadvisername}
	                        				onChange={handleOrgAdviserName}
	                        				id="orgadvisername"
	                        				name="orgadvisername"
	                        				label="Organization Adviser Name"
	                        				fullWidth
	                        				autoComplete="orgadvisername"
	                        			/>
	                        			<span style={{ color: "red" }}>
				                                {errors.orgadvisername}
				                          </span>
	                        		</Grid>

	                        	{/*	Quantity of Members and Officers */}
	                        		<Grid item xs={12} sm={6}>
	                        			<TextField 
	                        				value={quantitymembers}
	                        				onChange={handleQuantityMembers}
	                        				id="quantitymembers"
	                        				name="quantitymembers"
	                        				label="Members Quantity"
	                        				fullWidth
	                        				autoComplete="quantitymembers"
	                        				type="number"
	                        			/>
	                        			<span style={{ color: "red" }}>
				                                {errors.quantitymembers}
				                          </span>
	                        		</Grid>

	                        		<Grid item xs={12} sm={6}>
	                        			<TextField 
	                        				value={quantityofficers}
	                        				onChange={handleQuantityOfficers}
	                        				id="quantityofficers"
	                        				name="quantityofficers"
	                        				label="Officers Quantity"
	                        				fullWidth
	                        				autoComplete="quantityofficers"
	                        				type="number"
	                        			/>
	                        			<span style={{ color: "red" }}>
				                                {errors.quantityofficers}
				                          </span>
	                        		</Grid>


	                        		<Grid item xs={12}>	
	                        			<TextField 
	                        				value={description}
	                        				onChange={handleDescription}
	                        				id="description"
	                        				name="description"
	                        				label="Description of the Organization"
	                        				multiline
	                        				rowsMax="4"
	                        				className={classes.formControl}
	                        				margin="normal"
	                        				fullWidth
	                        			/>
	                        		</Grid>

	                        			

	                        		<Button
	                        			type="submit"
	                        			variant="outlined"
	                        			color="secondary"
	                        			className={classes.submit}
	                        		>
	                        			Add Record
	                        		</Button>
	                        		
	                        	</Grid>
	                        </form>

                        </Container>

	                    </Paper>

	                </main>

               </div>


          </DashboardAdmin>
		);
};

OrgAddForm.propTypes = { 
	classes: PropTypes.object.isRequired,
	orgDesc: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	updateOrgDesc: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	orgDesc: state.orgDesc,
	errors: state.errors
});

const mapDispatchToProps = { updateOrgDesc }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrgAddForm)));
