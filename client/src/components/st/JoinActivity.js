import React, { Fragment, useEffect, useState} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EventNoteIcon from '@material-ui/icons/EventNote';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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
    link: {
    display: 'flex',
  },
   icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
    formControl: {
        // margin: theme.spacing.unit,
        minWidth: '100% ',
    },
   submit:{
        marginTop: theme.spacing(3),
      },
}));

function JoinActivity(props) {
	
	const classes = useStyles();

	//States
	const [activity, getActivity] = useState({});

	const [departments, getDepartments] = useState([]);
	const [loadingDepartments, setLoadingDepartments] = useState(true);

	//Body State
	const [values, setValues] = useState({
		activityId: null,
		activityTitle: '',
		campus: '',
		studentName: '',
		srCode: '',
		campus: '',
		department: '',
		yr: '',
		section: '',
		contactNumber: ''
	})

	//Event Handlers
	const fetchAssessments = _ => {
		axios.get(`/api/assessments/getAssessments/${props.match.params.id}/${props.match.params.activity}`)
		.then(res => {
			// getActivity(res.data);
			setValues({...values, activityTitle: res.data.activity, 
				campus: res.data.campus, activityId: res.data.id})
		})
		.catch(err => console.log(err));
	}

	const fetchDepartments = _ => {
		axios.get('/api/departments')
		.then(res =>{
			getDepartments(res.data);
			setLoadingDepartments(false);
		})
		.catch(err => console.log(err));
	}

	const handleSubmit = e => {
		e.preventDefault();

		console.log(values);
	}

	//Component Effect
	useEffect(_ => {
		fetchAssessments();
		fetchDepartments();
	},[]);

	// console.log(values);

	return (
		<div>
			<Navbar />
				<Container style={{paddingTop: 20}}>

						<Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
				        <Link color="inherit" href="/st/activities" className={classes.link}>
				          <AssessmentIcon className={classes.icon} />
				          Assessment Activities
				        </Link>

				        <Link
				          color="textPrimary"
				          href={``}
				          aria-current="page"
				          className={classes.link}
				        >
				        <EventNoteIcon className={classes.icon} />
				          Join 
				        </Link>
				    </Breadcrumbs>
						
						<Grid container spacing={3}>

							<Grid item md>
		             		</Grid>

		             			<Grid item md={8} xs={12}>
									<Paper className={classes.root} elevation={10} >
											<Typography variant="h4" align="center">
											        Join Activity
											  </Typography>
											   <br></br>

											   <form noValidate onSubmit={handleSubmit}>

														<Grid container spacing={3}>

															<Grid item xs={6}>
   																<TextField 
   																value={values.activityTitle}
						                                        id="activityTitle"
						                                        name="activityTitle"
						                                        label="Activity Name"
						                                        fullWidth
						                                        InputProps={{
							                                       	 readOnly: true,
							                                      	}}
						                                            />
															</Grid>

															<Grid item xs={6}>
																	<TextField 
																	value={values.campus}
						                                        id="campus"
						                                        name="campus"
						                                        label="What Campus"
						                                        fullWidth
						                                        InputProps={{
							                                       	 readOnly: true,
							                                      	}}
						                                            />
															</Grid>

											   			</Grid>

											   			<br />
											   			<br />

											   				<Grid item xs={12}>
																<TextField 
																value={values.studentName}
																onChange={e => setValues({...values, studentName: e.target.value})}
						                                        id="studentName"
						                                        name="studentName"
						                                        label="Enter your full name"
						                                        fullWidth
						                                      	autoComplete
						                                            />
															</Grid>
															<br />

														<Grid item xs={12}>
																<TextField 
																value={values.srCode}
																onChange={e => setValues({...values, srCode: e.target.value})}
						                                        id="srCode"
						                                        name="srCode"
						                                        label="SR-Code"
						                                        fullWidth
						                                      	autoComplete
						                                            />
															</Grid>
															<br />

														<Grid item xs={12}>
							                                    {/* College Year TextField */}
							                                <FormControl className={classes.formControl}>
							                                        <InputLabel htmlFor="yr-simple">College Year</InputLabel>
							                                        <Select
							                                            value={values.yr}
							                                            onChange={e => setValues({...values, yr: e.target.value})}
							                                            inputProps={{
							                                            name: 'yr',
							                                            id: 'yr-simple',
							                                            }}
							                                        >
							                                            <MenuItem value={'1st'}>1st</MenuItem>
							                                            <MenuItem value={'2nd'}>2nd</MenuItem>
							                                            <MenuItem value={'3rd'}>3rd</MenuItem>
							                                            <MenuItem value={'4th'}>4th</MenuItem>
							                                            <MenuItem value={'5th'}>5th</MenuItem>
							                                            <MenuItem value={'Longer than 5th'}>Longer than 5th</MenuItem>
							                                        </Select>
							                                    </FormControl>
							                             </Grid>
														<br />

													<Grid container spacing={3}>

														<Grid item xs={6}>
															<FormControl className={classes.formControl}>

							                                        <InputLabel htmlFor="department-simple">Department</InputLabel>

							                                        <Select
							                                        value={values.department}
							                                        onChange={e => setValues({...values, department: e.target.value})}
							                                        inputProps={{
							                                        name: 'department',
							                                        id: 'department-simple',
							                                        }}
							                                        >

							                                        {loadingDepartments ?

							                                        <MenuItem></MenuItem> :

							                                        departments.map((department,id) => {
							                                        return ( <MenuItem key={id} value={department.department}>{department.department}</MenuItem>)
							                                        })   
							                                        }


							                                        </Select>
							                                                
							                                </FormControl>
														</Grid>

														<Grid item xs={6}>
																<TextField 
																value={values.section}
																onChange={e => setValues({...values, section: e.target.value})}
						                                        id="section"
						                                        name="section"
						                                        label="Section"
						                                        fullWidth
						                                      	autoComplete
						                                            />
														</Grid>

														<br />

													</Grid>
											<br />

											<Grid item xs={12}>
													<TextField 
														value={values.contactNumber}
														onChange={e => setValues({...values, contactNumber: e.target.value})}
						                                id="contactNumber"
						                                name="contactNumber"
						                                label="Contact Number"
						                                type="number"
						                                fullWidth
						                                autoComplete
						                                            />
													</Grid>
											<br />

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
									</Paper>
								</Grid>

							<Grid item md>
		             		</Grid>

						</Grid>

				</Container>
			</div>
		)
}

export default JoinActivity;