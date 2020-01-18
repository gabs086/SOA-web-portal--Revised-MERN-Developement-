import React, { Component } from 'react';
import Navbar from "../layouts/Navbar";

//Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class StudentIndex extends Component {
    constructor(props) {
        super(props)

        this.onLogoutClick = this.onLogoutClick.bind(this);

    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
                <Navbar />
                <button onClick={this.onLogoutClick}>Logout</button>
            </div>
        )
    }
}

StudentIndex.propTypes = {
    //Logout Func from the authActions
    logoutUser: PropTypes.func.isRequired,
    //object prop from the authReducer
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(StudentIndex);
