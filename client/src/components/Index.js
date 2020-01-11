import React from 'react';

import indexhead from './img/indexhead.jpg';

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
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);


        this.state = {
            username: '',
            password: '',
            showPassword: false

        }

    }

    handleChange = prop => e => {
        this.setState({
            [prop]: e.target.value
        });
    }

    handleClickShowPassword() {
        this.setState(state => ({
            showPassword: !state.showPassword
        }));
    }
    handleMouseDownPassword(e) {
        e.preventDefault();
    }

    render() {
        const { classes } = this.props;
        const password = this.state.password;
        const showPassword = this.state.showPassword;
        const handleClickShowPassword = this.handleClickShowPassword
        return (
            <div className={classes.root}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline /> {/* krung krung sa css baseline hahaha*/}
                    <div className={classes.paper}>

                        <img src={indexhead} alt="SOA Web Portal" />

                        <Typography component="h1" variant="h5">
                            Sign In
                    </Typography>

                        <form className={classes.form} noValidate>
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

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

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

                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
            </div>
        )
    }


}


Index.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Index);