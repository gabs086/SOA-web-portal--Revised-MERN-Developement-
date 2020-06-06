import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import axios from 'axios';

import Container from '@material-ui/core/Container';

import Navbar2 from "../layouts/Navbar2";

function OrgIndex(props) {

	const [orgOnline, setOrgOnline] = useState('');

	useEffect(_ => {
		const { auth } = props;

		axios.get('/api/org/getorgaccnts')
		.then(res => {
			res.data.filter(org => auth.user.username === org.username)
			.map(org => setOrgOnline(org.orgname))
		})
		.catch(err => err)

	},[]);

        return (
            <div>
                <Navbar2 />

    		 <Container style={{paddingTop: 20}}>
    		 	Hello {orgOnline}
    		 </Container>

            </div>
        )
}

const mapStateToProps = state => ({
	auth:state.auth
});

export default connect(mapStateToProps)(OrgIndex);
