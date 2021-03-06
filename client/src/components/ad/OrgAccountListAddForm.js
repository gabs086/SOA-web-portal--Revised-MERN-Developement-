import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addAccntRecords } from '../../actions/orgActions';
import { getOrgDesc } from '../../actions/orgDescActions';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ViewListIcon from '@material-ui/icons/ViewList';

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


function OrgAccountListAddForm(props){
        const classes = props;

        /////////States/////////////

        // Value States
        //Other way to get values of state and put it in an object
        const [values, setValues] = useState({
         // Data values
         orgname: '',
         username:'',
         password:'',

        // Password Input Textfield component 
        showPassword: false,
        // State to check if the registered organizationlist is fetch
        orgLoading: true,
       
        });
        // Error State 
        const [errors, getErrors] = useState({});

        const handleChange = prop => e => {
            setValues({...values, [prop]: e.target.value})
        };

        const handleClickShowPassword = () => {
            setValues({ ...values, showPassword: !values.showPassword });
          };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
          };

        const handleSubmit = e => {
            e.preventDefault();

            const datas = { 
                orgname: values.orgname.orgname,
                campus: values.orgname.campus,
                username: values.username,
                password: values.password,
                type: 'org',
            };

             props.addAccntRecords(datas);          
            
        };

        ///////////////useEffects//////////////////

        useEffect( _ => {

                props.getOrgDesc();
                setValues({...values, orgLoading: false})

        },[]);

        // useEffect if the input forms are done correctly 
        useEffect(_ => {
            if(props.org.registered){
                    props.history.push('/ad/organizationlist/accountlist/')
            }
        },[props.org.registered]);

        //useEffect for getting the errors
        useEffect( _ => {
            if(props.errors){
                getErrors(props.errors)
            }
        },[props.errors]);


        const orgArr = props.orgDesc.sort((a,b) => a.created_at > b.created_at ? -1 : 1);

        const orgArrFilter = orgArr.filter(org => org.orgname === values.orgname.orgname);

        return (
            <div>
                <DashboardAdmin>

                 <Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
                    <Link color="inherit" href="/ad/organizationlist" className={classes.link}>
                      <ViewListIcon className={classes.icon} />
                      Menu
                    </Link>

                    <Link
                      color="inherit"
                      href="/ad/organizationlist/accountlist"
                 
                      className={classes.link}
                    >
                    <ListAltIcon className={classes.icon} />
                      Account List
                    </Link>

                     <Link
                      color="textPrimary"
                      href="/ad/organizationlist/accountlist/registerorg"
                      aria-current="page"
                      className={classes.link}
                    >
                    <ViewListIcon className={classes.icon} />
                      Register
                    </Link>


                </Breadcrumbs>
                    <div className={classes.root}>
                        
                        <main className={classes.layout}>

                            <Paper
                             className={classes.paper}
                             style={{ paddingTop: '10px', paddingBottom:'30px'}}
                            >

                            <Typography variant="h4" align="center">
                                Organization Account Registration Form
                            </Typography>
                             <br></br>

                             <Container maxWidth="md">

                                <form noValidate onSubmit={handleSubmit}>

                                <Grid container spacing={3}>

                                      <Typography variant="h6">
                                            Input the details needed.
                                        </Typography>

                                   {/* Fragment to control the mapping of all registered  orgnames */}
                                        <Fragment>

                                        <Grid item xs={12}>
                                            <FormControl fullWidth className={classes.formControl}>

                                                <InputLabel htmlFor="orgname-simple">Organization</InputLabel>

                                                <Select
                                                    value={values.orgname}
                                                    onChange={handleChange('orgname')}
                                                    inputProps={{
                                                        name: 'orgname',
                                                        id:'orgname-simple'
                                                    }}
                                                >
                                                {
                                                    values.orgLoading ? 
                                                         <MenuItem></MenuItem>
                                                         :
                                                         // To access all the object data and use it in other components
                                                         // setthe response object as the value of the select component 
                                                         // and get the object data
                                                     orgArr.map(org => {
                                                        return <MenuItem  value={org}>{org.orgname}</MenuItem>
                                                         })
                                                }
                                                </Select>

                                            </FormControl>
                                             <span style={{ color: "red" }}>
                                                {errors.orgname}
                                             </span>

                                        </Grid>

                                        <Grid item xs={12}>
                                         {
                                            values.orgname === ''
                                            ? 
                                            <Fragment></Fragment>
                                            : 

                                            orgArrFilter.map(org => (

                                                 <Fragment>
                                                       <TextField
                                                        id="campus"
                                                        name="campus"
                                                        value={org.campus}
                                                          InputProps={{
                                                            readOnly: true,
                                                          }}
                                                        fullWidth
                                                    />
                                                    </Fragment>
                                                ))
                                         }
                                        </Grid>


                                        </Fragment>

                                        <Grid item xs={12}>
                                            <TextField
                                                value={values.username}
                                                onChange={handleChange('username')}
                                                id="username"
                                                name="username"
                                                label="Username"
                                                fullWidth
                                            />

                                            <span style={{ color: "red" }}>
                                                {errors.username}
                                             </span>
                                        </Grid>

                                        <Grid item xs={12}>
                                        <TextField 
                                            fullWidth
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            InputProps={{
                                                endAdornment:(
                                                     <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                    )
                                            }}

                                        />

                                            <span style={{ color: "red" }}>
                                                {errors.password}
                                             </span>

                                        </Grid>

                                </Grid>
                                <br />
                                <Button 
                                    type="submit"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.submit}
                                >
                                Register
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
  orgDesc: state.orgDesc.records,
  org: state.org,
  errors: state.errors
});

const mapDispatchToProps = { addAccntRecords,  getOrgDesc };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrgAccountListAddForm));