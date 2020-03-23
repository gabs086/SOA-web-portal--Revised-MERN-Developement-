import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
import axios from 'axios';

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
     
});



class LostItemForm extends Component {
    constructor(props){
        super(props);
        this.previousPage = this.previousPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: '',
            src: '',
            yr: '',
            campus: '',
            department: '',
            course:'',
            details:'',

            // Data For fetching the campuses
            campuses:[],
            loading: true

        }

    }

    componentDidMount(){
        axios.get('/api/campuses')
        .then(res => {
            this.setState({
                campuses: res.data,
                loading: false
            });
        })
        .catch(err => console.log(err));
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

        const { name, src, yr, campus, department, course, details } = this.state;
        const newLostReport = {
            name, src, yr, campus, department, course, details
        };

        console.log(newLostReport);
    }

    render(){

        const { classes } = this.props;
        const { yr, campus, details } = this.state;
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

                        <form onSubmit={handleSubmit}>

                        <Grid container spacing={3}>

                            {/* Ful Name Text Fiel  */}
                        <Grid item xs={12} md={12}>
                                <TextField
                                    required
                                    id="name"
                                    name="name"
                                    label="Full Name"
                                    fullWidth
                                    autoComplete="name"
                                    onChange={handleChange}
                                />
                                </Grid>

                                {/* SR-Code TextField  */}
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="src"
                                    name="src"
                                    label="SR-Code"
                                    fullWidth
                                    autoComplete="src"
                                    onChange={handleChange}
                                />
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

                                {this.state.loading ?

                                <MenuItem></MenuItem> :

                                this.state.campuses.map((campus,id) => {
                                    return ( <MenuItem key={id} value={campus.campusname}>{campus.campusname}</MenuItem>)
                                })   
                            }
                           

                            </Select>
                                            
                                    </FormControl>

                                </Grid>

                                {/* Department TextField */}
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="department"
                                    name="department"
                                    label="Department"
                                    fullWidth
                                    autoComplete="department"
                                    onChange={handleChange}
                                />  
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="course"
                                    name="course"
                                    label="Course"
                                    fullWidth
                                    autoComplete="Course"
                                    onChange={handleChange}
                                />  
                                </Grid>

                                {/* Details Text Field  */}
                                <Grid item xs={12}>
                                <TextField
                                    required
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
}

export default withStyles(styles)(LostItemForm);