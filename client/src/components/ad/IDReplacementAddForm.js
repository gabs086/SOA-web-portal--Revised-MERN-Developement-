import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addIdReplacment } from '../../actions/idreplacementActions';
 
import { withStyles } from '@material-ui/core/styles';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ViewListIcon from '@material-ui/icons/ViewList';

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

//Admin Dashboard Component
import DashboardAdmin from '../layouts/DashboardAdmin';

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

const IDReplacementAddForm = (props) => {

	const classes = props;

	////////States///////

	// Value States
	const [values, setValues] = useState({
		// State for the Name textField 
		name:'',
		//State for Year TextField
		year:'',
		// State for SR-Code TextField
		src:'',
		// State for Campus TextField
		campus:'',
		// State for Department TextField
		department:'',
		//State for Id Reason TextField
		idreason: '',
		//State for Count TextField
		count: '',
		// Other Info Optional TextField
		otherinfo: ''

	});

	// Getting the data for campuses and departments 
	const [campuses, getCampuses] = useState([]);
	const [loadingCampuses, setLoadingCampuses] = useState(true);
	const [departments, getDepartments] =  useState([]);
	const [loadingDepartments, setLoadingDepartments] = useState(true);

	// Errors State 
	const [errors, getErrors] = useState({});

	///////Event Handlers/////

	const handleChange = prop => e => {
		setValues({...values, [prop]: e.target.value})
	};

	const handleSubmit = e => {
		e.preventDefault();

		props.addIdReplacment(values);
	};

	/////Component Effects/////

	useEffect( _ => {

		const id = setInterval( _ => {

			(async _ => {
				const res = await axios.get('/api/campuses');
				 getCampuses(res.data);
	   			 setLoadingCampuses(false);
			})();

			(async _ => {
				const res = await axios.get('/api/departments');
				getDepartments(res.data);
				setLoadingDepartments(false);
			})();

		}, 2000 );

		return _ => {
			clearInterval(id);
		}

	},[]);


	// Effect when the form is done successfully 
	useEffect( _ => {
		if(props.idreplacement.added){
			
			props.history.push('/ad/idreplacement');
		}
	},[props.idreplacement.added]);

	// Effect for rendering Error messages 
	useEffect( _ => {
		if(props.errors)
			getErrors(props.errors)
	},[props.errors]);

  return (
    <div>

    <DashboardAdmin>

		 	<Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
		        <Link color="inherit" href="/ad/idreplacement" className={classes.link}>
		          <ViewListIcon className={classes.icon} />
		          Menu
		        </Link>

		        <Link
		          color="textPrimary"
		          href="/ad/idreplacement/addidreplacement"
		          aria-current="page"
		          className={classes.link}
		        >
		        <ListAltIcon className={classes.icon} />
		          Add
		        </Link>
		    </Breadcrumbs>

		    	<div className={classes.root}>

		    		<main className={classes.layout}>

		    			<Paper className={classes.paper}
		    			style={{ paddingTop: '10px', paddingBottom:'30px'}}
		    			>

		    				<Typography variant="h4" align="center">
	                            Organization Registration Form
	                        </Typography>
                        	<br></br>

                        	<Container maxWidth="md">

                        	<form noValidate onSubmit={handleSubmit}>

                        		<Typography variant="h6">
	                           	 Input the details needed.
								</Typography>

								<Grid item xs={12}>
								<TextField 
									value={values.name}
									onChange={handleChange('name')}
									id="name"
									name="name"
									label="Name of the student"
									fullWidth
									autoComplete
								/>

								</Grid>
								<span style={{ color: "red" }}>
                                       {errors.name}
                                 </span>

								<br/>
								<Grid item xs={12}>
									<FormControl fullWidth className={classes.formControl}>

										<InputLabel htmlFor="year-simple">Year of Program</InputLabel>

										<Select 
											value={values.year}
											onChange={handleChange('year')}
											inputProps={{
												name:'year',
												id:'year-simple'
											}}
										>

											<MenuItem value="1st Year">1st Year</MenuItem>
											<MenuItem value="2nd Year">2nd Year</MenuItem>
											<MenuItem value="3rd Year">3rd Year</MenuItem>
											<MenuItem value="4th Year">4th Year</MenuItem>
											<MenuItem value="5th Year">5th Year</MenuItem>
											<MenuItem value="Longer than 5th">Longer than 5th</MenuItem>
											
										</Select>

									</FormControl>

								</Grid>
								<span style={{ color: "red" }}>
                                       {errors.year}
                                 </span>
								<br/>

								<Grid item xs={12}>
									<TextField 
	                        				value={values.src}
	                        				onChange={handleChange('src')}
	                        				id="src"
	                        				name="src"
	                        				label="SR-Code of the student"
	                        				fullWidth
	                        			
	                        			/>
								</Grid>
								<span style={{ color: "red" }}>
                                       {errors.src}
                                 </span>
								<br/>


								<Grid container spacing={3}>

								<Grid item xs={12} sm={6}>

									<FormControl fullWidth className={classes.formControl}>

	                        				<InputLabel htmlFor="campus-simple">Campus of the Student</InputLabel>

	                        				<Select
	                        					value={values.campus}
	                        					onChange={handleChange('campus')}

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
								

									<Grid item xs={12} sm={6}>

									<FormControl fullWidth className={classes.formControl}>

	                        				<InputLabel htmlFor="department-simple">Department</InputLabel>

	                        				<Select
	                        					value={values.department}
	                        					onChange={handleChange('department')}

	                        					inputProps={{
	                        						name: 'department',
	                        						id:'department-simple'
	                        					}}
	                        				>
	                        				{
	                        					loadingDepartments ? 
	                        					     <MenuItem></MenuItem>
	                        					     :
	                        					 departments.map((campus, id) => {
	                        					 	return <MenuItem key={id} value={campus.department}>{campus.department} </MenuItem>
	                        					 })
	                        				}
	                        				</Select>

	                        			</FormControl>

	                        		<span style={{ color: "red" }}>
                                       {errors.department}
                                 </span>

								</Grid>

								</Grid>
								<br/>

								<Grid item xs={12}>
									<FormControl fullWidth className={classes.formControl}>

										<InputLabel htmlFor="idreason-simple">ID Replacement Reason</InputLabel>

										<Select 
											value={values.idreason}
											onChange={handleChange('idreason')}
											inputProps={{
												name:'idreason',
												id:'idreason-simple'
											}}
										>

											<MenuItem value="New Student">New Student</MenuItem>
											<MenuItem value="Transferee">Transferee</MenuItem>
											<MenuItem value="Shifter">Shifter</MenuItem>
											<MenuItem value="Lost ID">Lost ID</MenuItem>
											
										</Select>

									</FormControl>

								</Grid>
								<span style={{ color: "red" }}>
                                       {errors.idreason}
                                 </span>
								<br/>

								<Grid item xs={12}>
									<FormControl fullWidth className={classes.formControl}>

										<InputLabel htmlFor="count-simple">Count of ID Replacement Record</InputLabel>

										<Select 
											value={values.count}
											onChange={handleChange('count')}
											inputProps={{
												name:'count',
												id:'count-simple'
											}}
										>

											<MenuItem value="1st">1st</MenuItem>
											<MenuItem value="2nd">2nd</MenuItem>
											<MenuItem value="3rd">3rd</MenuItem>
											<MenuItem value="More...">More...</MenuItem>
											
										</Select>

									</FormControl>

								</Grid>
								<span style={{ color: "red" }}>
                                       {errors.count}
                                 </span>
								<br/>

								<Grid item xs={12}>
									<TextField 
	                        				value={values.otherinfo}
	                        				onChange={handleChange('otherinfo')}
	                        				id="otherinfo"
	                        				name="otherinfo"
	                        				label="Other Information/Remarks (Optional)"
	                        				multiline
	                        				rowsMax="4"
	                        				className={classes.formControl}
	                        				margin="normal"
	                        				fullWidth
	                        			/>
								</Grid>
								<br/>

								<Button
	                        			type="submit"
	                        			variant="outlined"
	                        			color="secondary"
	                        			className={classes.submit}
	                        		>
	                        			Add Record
	                        		</Button>

	                        	</form>
								
                        	</Container>

		    			</Paper> 

		    		</main>

		    	</div>

    </DashboardAdmin>

    </div>
  )
};

const mapStateToProps = state => ({
	idreplacement: state.idreplacement,
	errors: state.errors
});

const mapDispatchToProps = { addIdReplacment };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(IDReplacementAddForm));