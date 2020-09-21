import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

import indexhead from './img/indexhead.jpg';
import indexnewpic from './img/indexnewpic.png';

//PropTypes and actions
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

//MaterialUI Dependencies
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Link from '@material-ui/core/Link';

//Footer
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                SOA Web Portal by Gabriel V. Agoncillo
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: 10,
    },
     table: {
        minWidth: 700,
      },
    wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },

   buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '70%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

function Index (props) {


    const [login, setLogin] = useState({
        username: '',
        password: ''
    });

    const [errors, getErrors] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [setPic, setPicBool] = useState(true);

    const [users, getUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(false)

    const setPicNew = _ => {
        setPicBool(!setPic)
    };

    const handleClickShowPassword = _ => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = e => {
        e.preventDefault();
    }

    const handleChange = prop => e => {
        setLogin({...login, [prop]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        setLoadingAuth(!loadingAuth);

        const loginData = {
            username: login.username,
            password: login.password
        };

        props.loginUser(loginData);
    }

    useEffect(_ => {
        axios.get('/api/users/')
        .then(res => {
            getUsers(res.data);
            setLoading(false);
        })
        .catch(err => {
             if(err.response){
              setError(true)
            }  
        })
    },[]);

    useEffect(_ => {
        if(props.auth.isAuthenticated){
             if (props.auth.user.type === "admin") {
                props.history.push("/ad");
            }
            if (props.auth.user.type === "head") {
                props.history.push("/h");
            }
            if (props.auth.user.type === "org") {
                props.history.push("/org");
            }
            if (props.auth.user.type === "student") {
                props.history.push("/st");
            }
        }
    },[props.auth.isAuthenticated]);

    useEffect(_ => {
        if(props.errors){
            getErrors(props.errors);
            setLoadingAuth(false);
        }
    },[props.errors])

        const classes = useStyles();
   

        const rows = users;

        // console.log(loadingAuth);

        return (
            <div className={classes.root}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline /> {/* krung krung sa css baseline hahaha*/}
                    <div className={classes.paper}>

                        <a href="#" onClick={setPicNew}>
                            {
                                setPic 
                                ?  <img src={indexnewpic} alt="SOA Web Portal" />
                                :  <img src={indexhead} alt="SOA Web Portal" />                                
                            }
                        </a>

                        <Typography component="h1" variant="h5">
                            Sign In
                    </Typography>

                        <form className={classes.form} noValidate onSubmit={onSubmit}>
                            {/* Username handling */}
                            {   errors.username || errors.usernotfound
                                ?
                                <TextField
                                margin="normal"
                                error
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                onChange={handleChange("username")}
                                helperText={errors.username || errors.usernotfound}
                            />
                                :
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                onChange={handleChange("username")}
                               
                            />
                            }
                                {/* Password handling */}
                            {   errors.password || errors.passwordincorrect
                                ? 
                                <TextField
                                error
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={login.password}
                                    onChange={handleChange('password')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText={errors.password || errors.passwordincorrect}
                                />
                                :
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={login.password}
                                    onChange={handleChange('password')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            }
                            <br></br>

                            {/*
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            */
                            }
                           
                            <div className={classes.wrapper}>

                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                                disable={loadingAuth}
                            >
                                {loadingAuth ? 
                                    <Fragment>
                                    <CircularProgress size={24} className={classes.buttonProgress} /> 
                                    Loading... 
                                    </Fragment>
                                    : "Login"}
                            </Button>
                            </div>
                        </form>
                        <br></br>

                    <Box mt={8} mb={8}>
                        <Copyright />
                    </Box>

                      <Typography component="h1" variant="h5">
                            User accounts and roles
                    </Typography>

                    <Table className={classes.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell align="right">Password</TableCell>
                                <TableCell align="right">Role/Access</TableCell>
                                <TableCell align="right">Campus</TableCell>

                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map(row => (
                                <TableRow key={row.id}>
                                  <TableCell component="th" scope="row">
                                    {row.username}
                                  </TableCell>
                                  <TableCell align="right">{row.passwordTxt}</TableCell>
                                  <TableCell align="right">
                                  {
                                    row.type === 'student'
                                    ?
                                    "Student"
                                    :
                                    <Fragment>
                                    {
                                        row.type === 'org'
                                        ?
                                        "Student Orgnanization"
                                        :
                                        <Fragment>
                                            {
                                                row.type === 'head'
                                                ?
                                                "SOA Head"
                                                :
                                                "SOA Admin"
                                            }
                                        </Fragment>
                                    }
                                    </Fragment>
                                  }
                                  </TableCell>
                                  <TableCell align="right">{row.campus}</TableCell>

                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>

                    </div>
                </Container>
            </div>
        )

}


Index.propTypes = {
    //Style propTypes
    classes: PropTypes.object.isRequired,
    //Function propTypes
    loginUser: PropTypes.func.isRequired,
    //Reducer propTypes
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Index);