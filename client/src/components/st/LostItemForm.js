import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addLostReport } from "../../actions/lafActions";

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import axios from 'axios';

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

class LostItemForm extends Component {
    constructor(props){
        super(props);
        this.previousPage = this.previousPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.chooseContactOption = this.chooseContactOption.bind(this)
        this.getCampuses = this.getCampuses.bind(this);

        this.state = {
            // Data values 
            name: '',
            src: '',
            yr: '',
            campus: '',
            department: '',
            course:'',
            details:'',
            contact:'',
            // Data For fetching the campuses
            campuses:[],
            departments: [],
            loadingCampuses: true,
            loadingDepartments: true,
            // Contact Radio States 
            contactValue: '',
            // Error handling 
            errors: {}
        }

    }

    getCampuses(){
        axios.get('/api/campuses')
        .then(res => {
            this.setState({
                // Passing the data from the databse of campuses in the state
                campuses: res.data,
                // Tip: always include loading state so the component wont have error in rendering components
                loadingCampuses: false
            });
        })
        .catch(err => console.log(err));
    }

    getDepartments(){
        axios.get('/api/departments')
        .then(res => {
            this.setState({
                // Same as rendering of data to the states 
                departments: res.data,
                loadingDepartments: false,
            })
        })
        .catch(err => console.log(err));
    }
    
    componentDidMount(){
       this.getCampuses();
       this.getDepartments();

       if(this.props.laf.lost){
        this.props.history.push("/st/lostandfoundpage");
       }
    }

    chooseContactOption(e){
        this.setState({
            contactValue: e.target.value
        });
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    previousPage(e){
        e.preventDefault();
        window.location.href = '/st/lostandfoundpage';
    }

    handleSubmit(e){
        e.preventDefault();

        // Object of getting the values of state for form submittion
        const { name, src, yr, campus, department, course, details, contact } = this.state;
        // Putting it all in a variable
        const newLostReport = {
            name, src, yr, campus, department, course, details, contact
        };
        // Action for form submittion
        this.props.addLostReport(newLostReport);
    }

    static getDerivedStateFromProps(props, state) {
        // For passing value of props, like the above componentDidMount
        if(props.laf.lost){
            props.history.push("/st/lostandfoundpage");
           }
        // Passing the error props
        if (props.errors) {
            return { errors: props.errors }
        } 
    }

    render(){
        let contactTextField;
        if(this.state.contactValue === 'phone'){
            contactTextField  = 
            <TextField
            id='contact'
            label="Contact Number"
            name='contact'
            value={this.state.contact}
            onChange={this.handleChange}
            type="number"
            className={this.props.formControl}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          /> 
        }

        if(this.state.contactValue === 'email'){
            contactTextField = 
            <TextField
                id="contact"
                name="contact"
                label="E-Mail"
                fullWidth
                className={this.props.formControl}
                value={this.state.contact}
                autoComplete="contact"
                type='email'
                onChange={this.handleChange}
            />
        }
        
        const { classes } = this.props;
        const { name, src, yr, campus, department, course, details, loadingCampuses, loadingDepartments, errors } = this.state;
        const previousPage = this.previousPage;
        const handleChange = this.handleChange;
        const handleSubmit = this.handleSubmit;

        return(
            <div className={classes.root}>    
            
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        
                        <CloseIcon onClick={previousPage} className={classes.closeIcon}/>

                        <Typography variant="h4" align="center">
                            Lost Item Report Form
                        </Typography>
                        <br></br>
                        <Typography variant="h6">
                            Input the details needed.
                        </Typography>

                        <form noValidate onSubmit={handleSubmit}>

                        <Grid container spacing={3}>

                            {/* Ful Name Text Fiel  */}
                        <Grid item xs={12} md={12}>
                                <TextField
                                    id="name"
                                    name="name"
                                    value={name}
                                    label="Full Name"
                                    fullWidth
                                    autoComplete="name"
                                    onChange={handleChange}
                                />
                             <span style={{ color: "red" }}>
                                {errors.name}
                            </span>
                                </Grid>

                                {/* SR-Code TextField  */}
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    id="src"
                                    name="src"
                                    value={src}
                                    label="SR-Code"
                                    fullWidth
                                    autoComplete="src"
                                    onChange={handleChange}
                                />
                            <span style={{ color: "red" }}>
                                {errors.src}
                            </span>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    {/* College Year TextField */}
                                <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="yr-simple">College Year</InputLabel>
                                        <Select
                                            value={yr}
                                            onChange={handleChange}
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
                            <span style={{ color: "red" }}>
                                {errors.yr}
                            </span>

                                </Grid>

                                <Grid item xs={12}>
                                    {/* Campuses TextField */}
                                    <FormControl className={classes.formControl}>

                                    <InputLabel htmlFor="campus-simple">Campus</InputLabel>
                                   
                                        <Select
                                            value={campus}
                                            onChange={handleChange}
                                            inputProps={{
                                            name: 'campus',
                                            id: 'campus-simple',
                                            }}
                                        >

                                            {loadingCampuses ?

                                            <MenuItem></MenuItem> :

                                            this.state.campuses.map((campus,id) => {
                                                return ( <MenuItem key={id} value={campus.campusname}>{campus.campusname}</MenuItem>)
                                            })   
                                        }
                                    

                                        </Select>
                                            
                                    </FormControl>
                                    <span style={{ color: "red" }}>
                                {errors.campus}
                            </span>

                                </Grid>

                                {/* Department TextField */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={classes.formControl}>

                                        <InputLabel htmlFor="department-simple">Department</InputLabel>

                                        <Select
                                        value={department}
                                        onChange={handleChange}
                                        inputProps={{
                                        name: 'department',
                                        id: 'department-simple',
                                        }}
                                        >

                                        {loadingDepartments ?

                                        <MenuItem></MenuItem> :

                                        this.state.departments.map((department,id) => {
                                        return ( <MenuItem key={id} value={department.department}>{department.department}</MenuItem>)
                                        })   
                                        }


                                        </Select>
                                                
                                </FormControl>
                                <span style={{ color: "red" }}>
                                {errors.department}
                            </span>

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                <TextField
                                    id="course"
                                    name="course"
                                    value={course}
                                    label="Course"
                                    fullWidth
                                    autoComplete="Course"
                                    onChange={handleChange}
                                />  
                                <span style={{ color: "red" }}>
                                {errors.course}
                            </span>
                                </Grid>

                                {/* Details Text Field  */}
                                <Grid item xs={12}>
                                <TextField
                                    id="details"
                                    name="details"
                                    label="Details of Lost item"
                                    multiline
                                    rowsMax="4"
                                    value={details}
                                    onChange={handleChange}
                                    className={classes.formControl}
                                    margin="normal"
                            />
                            <span style={{ color: "red" }}>
                                {errors.details}
                            </span>
                                </Grid>
                                
                                {/* Contact Text Field  */}
                                <Grid item sx={12}>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Contact</FormLabel> 

                                        <RadioGroup 
                                        aria-label="Contact"
                                        name="contact"
                                        className={classes.group}
                                        value={this.state.contactValue}
                                        onChange={this.chooseContactOption}
                                        >
                                            <FormControlLabel value='phone' control={<Radio />} label="Phone" />

                                            <FormControlLabel value="email" control={<Radio />} label="Email" />

                                        </RadioGroup>

                                    </FormControl> 

                                </Grid>

                                <Grid>
                                   { contactTextField }
                                   <span style={{ color: "red" }}>
                                {errors.contact}
                            </span>
                                </Grid>



                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                submit
                            </Button>
                                
                        </Grid>

                        </form>
                    </Paper>
                </main>

            </div>
        );
    };

};

LostItemForm.propTypes = {
    classes: PropTypes.object.isRequired,
    //Lost and Found action
    addLostReport: PropTypes.func.isRequired,
    //Reducers
    laf: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    laf:state.laf,
    errors: state.errors
});


export default connect(
    mapStateToProps,
    { addLostReport }
)(withStyles(styles)(LostItemForm));