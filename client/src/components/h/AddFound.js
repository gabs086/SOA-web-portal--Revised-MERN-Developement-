import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from "react-redux";
import moment from 'moment';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import DashBoardHead from '../layouts/DashboardHead';

// Object Styles for the components 
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
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
      }
});

function AddFound(props){


    const classes = props;

    // State for the campuses and its loading state
  const [campuses, getCampuses] = useState([]);
  const [loadingCampuses, setLoadingCampuses] = useState(true);
 
  // Value States 
  const [finderName ,setFinderName]  = useState('');
  const [foundItem, setFoundItem] = useState('');
  const [campus, setCampus] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

// Value functions : 

// For Findername State 
const handleFinderName = e => {
        e.preventDefault();
    setFinderName(e.target.value);
};

// For FoundItem State
const handleFoundItem = e => {
        e.preventDefault();
    setFoundItem(e.target.value);
}

// For campus State 
const handleCampus = e => {
    e.preventDefault();

    setCampus(e.target.value);
};

// For selectedDate state 
const handleDateChange = date => {
    setSelectedDate(date);
};


const handleSubmit = e => {

    e.preventDefault();

    const dateData = moment(selectedDate).format('YYYY-MM-DD, h:mm:ss a');

    const newFoundRecord = {
        finderName,
        foundItem,
        campus,
        dateData
    };

    console.log(newFoundRecord);
};


    useEffect( _ => {
        (async _ => {
            const res = await axios.get('/api/campuses');
            getCampuses(res.data);
            setLoadingCampuses(false);
        })();
    }, []);

  return (
     <DashBoardHead>

      <Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
        <Link color="inherit" href="/h/lostandfound" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Menu
        </Link>

        <Link
          color="inherit"
          href="/h/lostandfound/foundreports"
          aria-current="page"
          className={classes.link}
        >
        <FindReplaceIcon className={classes.icon}/>
          Lost Reports
        </Link>
        <Link
          color="textPrimary"
          href="/h/lostandfound/foundreports/addfoundrecord"
          aria-current="page"
          className={classes.link}
        >
        <ListAltIcon className={classes.icon} />
          Add
        </Link>
    </Breadcrumbs>

        {/* Main Component for the form of AddFound */}
         <div className={classes.root}>    
            
                <main className={classes.layout}>
                    <Paper className={classes.paper} style={{ paddingTop: '10px', paddingBottom:'30px'}}>

                        <Typography variant="h4" align="center">
                            Lost Item Report Form
                        </Typography>
                        <br></br>

                <Container maxWidth="md">
                        <Typography variant="h6">
                            Input the details needed.
                        </Typography>

                        <form noValidate onSubmit={handleSubmit}>

                        <Grid container spacing={3}>

                            {/* Ful Name Text Fiel  */}
                        <Grid item xs={12}>
                                <TextField
                                value={finderName}
                                onChange={handleFinderName}
                                    id="findername"
                                    name="findername"
                                    label="Founder Name"
                                    fullWidth
                                    autoComplete="findername"
                                />
                           
                                </Grid>

                          <Grid item xs={12}>
                                <TextField
                                value={foundItem}
                                onChange={handleFoundItem}
                                    id="founditem"
                                    name="founditem"
                                    label="Found Item"
                                    fullWidth
                                    autoComplete="founditem"
                                />
                           
                            </Grid>

                       { /* Campuses Selection */ }
                        <Grid item xs={12}>
                            {/* Campuses TextField */}
                            <FormControl fullWidth className={classes.formControl}>

                            <InputLabel htmlFor="campus-simple">Campus</InputLabel>

                                <Select
                                    value={campus}
                                    onChange={handleCampus}
                                    
                                    inputProps={{
                                        name:'campus',
                                        id: 'campus-simple'
                                    }}
                                >

                                {
                                    loadingCampuses ?
                                        <MenuItem></MenuItem>
                                    :
                                    campuses.map((campus, id) => {
                                        return( <MenuItem key={id} value={campus.campusname}>{campus.campusname} </MenuItem>)
                                    })
                                }


                                </Select>

                            </FormControl>
                        </Grid>
                               
                       { /* Date Selection */ }
                        <Grid item xs={12}>
                         <FormControl fullWidth className={classes.formControl}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      disableToolbar
                                      variant="inline"
                                      format="MM/dd/yyyy"
                                      margin="normal"
                                      id="date-picker-inline"
                                      label="Date picker inline"
                                      value={selectedDate}
                                      onChange={handleDateChange}
                                      KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                      }}
                                    />
                            </MuiPickersUtilsProvider>
                          </FormControl>
                        </Grid>


                         <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Add
                            </Button>



                        </Grid>

                        </form>



                </Container>
                    </Paper>
                </main>

            </div>
      </DashBoardHead>
  )
};

AddFound.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddFound);