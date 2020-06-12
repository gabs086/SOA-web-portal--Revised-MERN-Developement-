import axios from 'axios';

import {
	GET_ORG_FEEDS,
	GET_REQUEST_ACTIVITIES,
	SUBMIT_REQUEST_ACTIVITIES,
	REQUEST_ACTIVITIES_LOADING,
	GET_ERRORS,
} from './types';

// Getting the data in the org_feeds table 
export const getOrgFeeds = _ => dispatch => {
	dispatch(setRecordLoading);
	axios.get('/api/requestactivities/getorgfeeds')
	.then(res => dispatch({
		type: GET_ORG_FEEDS,
		payload: res.data
	}))
	.catch(err => err);
};
//Getting the activities data in the database
export const getActivities = _ => dispatch => {
	dispatch(setRecordLoading);
	axios.get('/api/requestactivities/getrequestactivities')
	.then(res => dispatch({
		type: GET_REQUEST_ACTIVITIES,
		payload: res.data
	}))
	.catch(err => err);
};


//Action for request sumittions
export const submitRequest = data => dispatch => {

	axios.post('/api/requestactivities/submitrequest', data)
	.then(res => dispatch({
		type: SUBMIT_REQUEST_ACTIVITIES,
		payload: res.data,

	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
}

export const setRecordLoading = _ => {
	return { type: REQUEST_ACTIVITIES_LOADING }
};