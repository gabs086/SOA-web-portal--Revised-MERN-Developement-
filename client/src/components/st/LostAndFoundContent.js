import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from "../layouts/Navbar";

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';


class LostAndFoundContent extends Component {

    render(){
        return(
            <div>
            <Navbar />

            Lost and Found Content
            </div>
        );
    }
}

export default LostAndFoundContent;
