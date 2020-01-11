import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
//For Implementing Redux components
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Private Routing function
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true
                // if 
                ? (
                    //if the user is authenticated
                    <Component {...props} />
                )
                // else 
                : (
                    //if not, it will stay in the login route
                    <Redirect to="/login" />
                )
        }
    />
);

//PropTypes 
PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired;
}

// mapstatetoprops 
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);

