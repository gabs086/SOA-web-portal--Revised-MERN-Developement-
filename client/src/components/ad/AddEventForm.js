import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addAnnouncement, addAnnouncementFalse } from '../../actions/announcementActions';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ViewListIcon from '@material-ui/icons/ViewList';

import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker,} from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

//Admin Dashboard Component
import DashboardAdmin from '../layouts/DashboardAdmin';

function createFormData(object, form, namespace) {
  var formData = form || new FormData();
  for (var property in object) {
    if (!object.hasOwnProperty(property) || !object[property]) {
      continue;
    }
    var formKey = namespace ? namespace + "[" + property + "]" : property;
    if (object[property] instanceof Date) {

      formData.append(formKey, object[property].toISOString());

    } else if ( typeof object[property] === "object" && !(object[property] instanceof File) ) {

      createFormData(object[property], formData, formKey);

    } else {
      formData.append(formKey, object[property]);
    }
  }
  return formData;
};

// Object Styles for the components 
const styles = makeStyles(theme => ({
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
}));


function AdminIndex(props){
        const classes = styles();

        /* States*/

        const [values, setValues] = useState({
            poster: "",
            fileName:"",
            title: '',
            venue: '',
            description: '',
            bgColor:'',

        });
         const [selectedDate, setSelectedDate] = useState(new Date());
         const [selectedTime, setSelectedTime] = useState(new Date());

         const [errors, getErrors] = useState({});
        
        /* Event Handlers*/
        const handleDate = date => {
            setSelectedDate(date);
        }

        const handleTime = time => {
            setSelectedTime(time);
        }

        const handleSubmit = e => {
            e.preventDefault();

            // const fullDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
            const dateDate = moment(selectedDate).format('YYYY-MM-DD');
            const dateTime = moment(selectedTime).format('HH:mm:ss');       

            const date = `${dateDate} ${dateTime}`;

            const newAnnouncement = { 
                ...values,
                date,
                dateDate,
                dateTime,
                setBy: 'SOA Admin'
            }

            const _formData = createFormData(newAnnouncement);

            console.log(newAnnouncement);
            // console.log(_formData);
            props.addAnnouncement(_formData);

        }

        // Component Effect for a successful Adding of Announcement
        useEffect(_ => {
           if(props.announcement.added)
              props.history.push('/ad/announceevent');

        },[props.announcement.added]);

        // Component Effect for the errors
        useEffect(_ => {
          if(props.errors)
              getErrors(props.errors)
        },[props.errors])

     
        return (
            <div>
                <DashboardAdmin>

                <Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
                    <Link color="inherit" href="/ad/announceevent" className={classes.link}>
                      <ViewListIcon className={classes.icon} />
                      Menu
                    </Link>

                    <Link
                      color="textPrimary"
                      href="/ad/announceevent/addevent"
                      aria-current="page"
                      className={classes.link}
                    >
                    <ListAltIcon className={classes.icon} />
                      Add
                    </Link>
                </Breadcrumbs>

                    <Paper className={classes.root}>
                          
                                <Container maxWidth="lg">

                                  <Typography variant="h4" align="center">
                                        Announce Event Form
                                    </Typography>
                                      <br></br>

                                    <form noValidate onSubmit={handleSubmit}>

                                    <Typography variant="h6">
                                     Input the details needed.
                                    </Typography>

                                        <Grid item xs={12}>
                                            <TextField 
                                            value={values.title}
                                            onChange={e => setValues({...values, title: e.target.value})}
                                                id="title"
                                                name="title"
                                                label="Announcement/Event Title"
                                                fullWidth
                                                autoComplete
                                            />
                                        </Grid>
                                        <span style={{ color: "red" }}>
                                               {errors.title}
                                         </span>
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
                                                          label="Date of the event"
                                                          KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                          }}
                                                        />
                                                </MuiPickersUtilsProvider>
                                          </FormControl>
                                        </Grid>
                                         <span style={{ color: "red" }}>
                                               {errors.date}
                                         </span>
                                        
                                        <br />

                                         <Grid item xs={12}>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardTimePicker
                                                     format= "hh:mm a"
                                                      value={selectedTime}
                                                      onChange={handleTime}
                                                      margin="normal"
                                                      id="time-picker"
                                                      label="Time picker"
                                                      KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                      }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </FormControl>
                                         </Grid>
                                         <br/>

                                        <Grid item xs={12}>
                                            <TextField 
                                                value={values.venue}
                                                onChange={e => setValues({...values, venue: e.target.value})}
                                                id="venue"
                                                name="venue"
                                                label="Where the event will happen"
                                                fullWidth
                                                autoComplete
                                            />
                                        </Grid>
                                         <span style={{ color: "red" }}>
                                               {errors.venue}
                                         </span>
                                        <br />

                                <Grid container spacing={1} alignItems="flex-end">

                                    <Grid item xs={1}>

                                      {/* 
                                         onChange={e => setObj({...obj, file: e.target.files[0], fileName: e.target.files[0].name})} 

                                        value={obj.fileName}

                                      */}
                                        <input
                                        onChange={e => setValues({...values, poster: e.target.files[0], fileName: e.target.files[0].name})} 
                                        className={classes.input} id="poster" name="poster" type="file" />
                                          <label htmlFor="poster">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                              <CloudUploadIcon />
                                            </IconButton>
                                         </label>

                                      </Grid>

                                      <Grid item xs={11}>
                                        <TextField 
                                        value={values.fileName}
                                        id="input-with-icon-grid"
                                        label="Poster for the event"
                                        helperText="Note: .png and .jpg is required"
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
                                 <span style={{ color: "red" }}>
                                               {errors.poster}
                                         </span>

                                <br />

                                <Grid container spacing={1} alignItems="flex-end">

                                <Grid item xs={8}>
                                      <TextField 
                                            value={values.description}
                                            onChange={e => setValues({...values, description: e.target.value})}
                                                id="description"
                                                name="description"
                                                label="Description of the Event"
                                                fullWidth
                                                autoComplete
                                                multiline
                                            />
                                    </Grid>
                                     <span style={{ color: "red" }}>
                                               {errors.description}
                                         </span>
                                    <br/>

                                    <Grid item xs={4}>
                                            <TextField 
                                            type="color"
                                            value={values.bgColor}
                                            onChange={e => setValues({...values, bgColor: e.target.value})}
                                                id="color"
                                                name="color"
                                                label="Choose color for the display background of the event"
                                                fullWidth
                                                autoComplete
                                            />
                                        </Grid>

                                    </Grid>

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
                </DashboardAdmin>
            </div>
        )
    
}

const mapStateToProps = state => ({
  announcement: state.announcement,
  errors: state.errors,
});

const mapDispatchToProps = { addAnnouncement }; 

export default connect(mapStateToProps, mapDispatchToProps)(AdminIndex);
