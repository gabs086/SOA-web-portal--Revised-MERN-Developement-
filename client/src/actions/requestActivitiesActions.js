import axios from 'axios';

import {
	//Organization SIde
	GET_ORG_FEEDS,
	GET_REQUEST_ACTIVITIES,
	SUBMIT_REQUEST_ACTIVITIES,
	REQUEST_ACTIVITIES_LOADING,

	// SOA Head SIde 
	COUNT_REQUEST_ACTIVITIES_NOTIF,
	GET_REQUEST_ACTIVITIES_HEAD,
	UPDATE_COUNT_NOTIF,
	SET_APPROVED_REQUEST_ACTIVITIES_HEAD,
	SET_DECLINED_REQUEST_ACTIVITIES_HEAD,
	// SOA Admin Side 

	GET_ERRORS,
} from './types';

/* Organization Side */

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
};


/* SOA Head Side */
export const countNotifHead = request => dispatch => {
	axios.get(`/api/requestactivities/countheadrequest/${request}`)
	.then(res => dispatch({
		type: COUNT_REQUEST_ACTIVITIES_NOTIF,
		payload: res.data
	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
}

export const getActivitiesHead = _ => dispatch => {
	dispatch(setRecordLoading);
	axios.get('/api/requestactivities/getrequestactivities')
	.then(res => dispatch({
		type: GET_REQUEST_ACTIVITIES_HEAD,
		payload: res.data
	}))
	.catch(err => err);
}

export const updateCountNotif = (notif, campus) => dispatch => {
	axios.post(`/api/requestactivities/updatecountheadrequest/${campus}`, notif)
	.then(res => dispatch({
		type: UPDATE_COUNT_NOTIF,
		payload: res.data
	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
}

export const setApprovedHead = (id, data, data2) => dispatch => {
	axios.post(`/api/requestactivities/approverequestactivityhead/${id}`, data)
	.then(res => dispatch({
		type: SET_APPROVED_REQUEST_ACTIVITIES_HEAD,
		payload: res.data
	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));

	axios.post('/api/requestactivities/requestactivityapproved/notif', data2)
	.then(res => res)
	.catch(err => err);
}

export const setDeclinedHead = (id, data, data2) => dispatch => {
	axios.post(`/api/requestactivities/declinedrequestactivityhead/${id}`, data)
	.then(res => dispatch({
		type: SET_DECLINED_REQUEST_ACTIVITIES_HEAD,
		payload: res.data
	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));

	axios.post('/api/requestactivities/requestactivitydeclined/notif', data2)
	.then(res => res)
	.catch(err => err)
}

/* SOA Admin Side */

export const setRecordLoading = _ => {
	return { type: REQUEST_ACTIVITIES_LOADING }
};