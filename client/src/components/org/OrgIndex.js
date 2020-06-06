import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import axios from 'axios';

import Container from '@material-ui/core/Container';

import Navbar2 from "../layouts/Navbar2";

export class OrgIndex extends Component {
	constructor(props){
		super(props)

		this.state = {
			orgOnline: ''
		}

	}

	componentDidMount(){

		const { auth } = this.props;

		axios.get('/api/org/getorgaccnts')
		.then(res => {
			
			// console.log(res.data)

			res.data.filter(org => auth.user.username === org.username)
			.map(org => this.setState({ orgOnline: org.orgname }));

		})
		.catch(err => err);
	}

    render() {

    	const { orgOnline } = this.state;

    	// console.log(auth)

    	console.log(orgOnline);

        return (
            <div>
                <Navbar2 />

    		 <Container style={{paddingTop: 20}}>
    		 	Hello {orgOnline}
    		 </Container>

            </div>
        )
    }
}

OrgIndex.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth:state.auth
});

export default connect(mapStateToProps)(OrgIndex);
