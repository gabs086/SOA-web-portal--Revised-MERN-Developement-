import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddBoxIcon from '@material-ui/icons/AddBox';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker,} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

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
    },
    tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
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
}));

function AddAssessment(props){

 	const classes = useStyles();

 	/*State*/
 	const [errors, getErrors] = useState({});

 	const [values, setValues] = useState({
 		activity: '',
 		activityRequirements: '',
 		description: ''
 	});

 	const [selectedDate, setSelectedDate] = useState(new Date());

 	/*Event Handlers*/

 	 const handleDate = date => {
        setSelectedDate(date);
     }


 	const handleSubmit = e => {
 		e.preventDefault();
 	}

 	useEffect( _ => {
      if(props.errors){
        getErrors(props.errors)
      }
    },[props.errors]);

 	const { user } = props.auth;

  return (
    <div>
    	<Navbar2 />

    	<Container style={{paddingTop: 10}}>

    	 <Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
                        <Link color="inherit" href="#" className={classes.link}>
                          <AssessmentIcon className={classes.icon} />
                          Calendar
                        </Link>

                        <Link
                          color="textPrimary"
                          href={``}
                          aria-current="page"
                          className={classes.link}
                        >
                        <AddBoxIcon className={classes.icon} />
                          Add Activity
                        </Link>
                    </Breadcrumbs>

    	<Grid container spacing={3}>
    		 <Grid item md>
             </Grid>

			<Grid item md={8} xs={12}>
				<Paper className={classes.root} elevation={10} >

						<Typography variant="h4" align="center">
                           Activity Assessment
                        </Typography>
                        <br></br>

                        <form noValidate>

								<Grid item xs={12}>
                                    <TextField 
                                        value={values.activity}
                                        onChange={e => setValues({...values, activity: e.target.value})}
                                        id="activity"
                                        name="activity"
                                        label="Enter the name of the activity to implement"
                                        fullWidth
                                        autoComplete
                                            />
                                </Grid>
                                <br />

					<Grid item xs={12}>
                        <FormControl fullWidth className={classes.formControl}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                          value={selectedDate}
                                                          onChange={handleDate}
                                                          disableToolbar
                                                          variant="inline"
                                                          format="yyyy-MM-dd"
                                                          margin="normal"
                                                          id="date-picker-inline"
                                                          label="Date of the Activity"
                                                          KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                          }}
                                                        />
                                    </MuiPickersUtilsProvider>
                             </FormControl>
                     </Grid>
                     <br />

                     	<Grid item xs={12}>
                                    <TextField 
                                        value={values.activityRequirements}
                                        onChange={e => setValues({...values, activityRequirements: e.target.value})}
                                        id="activityRequirements"
                                        name="activityRequirements"
                                        label="Enter the requirements/instruction of the activity to implement"
                                        fullWidth
                                        autoComplete
                                         multiline
         								 rows={4}
         								 variant="outlined"
                                            />
                                </Grid>
                                <br />

                         <Grid item xs={12}>
                                     <TextField
                                     	label="Your Campus"
                                      	id="campus"
                  						name="campus"
                                    	value={user.campus}
                                      	InputProps={{
                                       	 readOnly: true,
                                      	}}
                                    	fullWidth
                                	/>
                                </Grid>
                                <br />


                            <Grid item xs={12}>
                                    <TextField 
                                        value={values.description}
                                        onChange={e => setValues({...values, description: e.target.value})}
                                        id="description"
                                        name="description"
                                        label="Enter the description of the activity to implement"
                                        fullWidth
                                        autoComplete
                                         multiline
         								 rows={4}
         								 variant="outlined"
                                            />
                                </Grid>
                                <br />

				 			<Typography variant="body2" color="textPrimary" component="p">
				                  *** Please double check anything before passing it as a activity
				           </Typography>

				              <Button
                                type="submit"
                               size="small" 
                               variant="outlined" 
                               color="secondary"
                                className={classes.submit}
                            >
                               Upload activity
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

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps)(AddAssessment);