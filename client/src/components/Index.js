import React, { Fragment } from 'react';
import axios from 'axios';

import indexhead from './img/indexhead.jpg';
import indexnewpic from './img/indexnewpic.png';

//PropTypes and actions
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

//MaterialUI Dependencies
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

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


const styles = {
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
}

class Index extends React.Component {
    
    constructor(props) {
        super(props)
        // Form 
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        // Magic for setting the img true 
        this.setPicNew = this.setPicNew.bind(this);

        this.state = {
            username: '',
            password: '',
            errors: {},

            showPassword: false,
            setPic: true,
            users:[],
            loading: true,
            error: false
        }

    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            if (this.props.auth.user.type === "admin") {
                this.props.history.push("/ad");
            }
            if (this.props.auth.user.type === "head") {
                this.props.history.push("/h");
            }
            if (this.props.auth.user.type === "org") {
                this.props.history.push("/org");
            }
            if (this.props.auth.user.type === "student") {
                this.props.history.push("/st");
            }

        }

        axios.get('/api/users/')
        .then(res => this.setState({
                users: res.data,
                loading: false
        }))
        .catch(err => {
            if(err.response){
                this.setState({
                    error: true
                })
            }
        })
    }

    setPicNew() {
        this.setState(state => ({
            setPic: !state.setPic
        }));
    }

    handleClickShowPassword() {
        this.setState(state => ({
            showPassword: !state.showPassword
        }));
    }
    handleMouseDownPassword(e) {
        e.preventDefault();
    }

    handleChange = prop => e => {
        this.setState({
            [prop]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const loginData = {
            username: this.state.username,
            password: this.state.password
        };
        //Function for authentication
        this.props.loginUser(loginData);

    }

    //Alernative method for componentWillReceiveProps
    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps);
        if (nextProps.auth.isAuthenticated) {
            if (nextProps.auth.user.type === "admin") {
                nextProps.history.push("/ad");
            }
            if (nextProps.auth.user.type === "head") {
                nextProps.history.push("/h");
            }
            if (nextProps.auth.user.type === "org") {
                nextProps.history.push("/org");
            }
            if (nextProps.auth.user.type === "student") {
                nextProps.history.push("/st");
            }

        }


        if (nextProps.errors) {
            return ({ errors: nextProps.errors })
        }
        
    }

    render() {
        const { classes } = this.props;
        const { password, showPassword, errors, setPic, users, loading, error} = this.state;
        const handleClickShowPassword = this.handleClickShowPassword;
        const setPicNew = this.setPicNew;

        const rows = users;

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

                        <form className={classes.form} noValidate onSubmit={this.onSubmit}>
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
                                onChange={this.handleChange("username")}
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
                                onChange={this.handleChange("username")}
                               
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
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={this.handleChange('password')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={this.handleMouseDownPassword}
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
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={this.handleChange('password')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={this.handleMouseDownPassword}
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
                           

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Login
                            </Button>
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
)(withStyles(styles)(Index));