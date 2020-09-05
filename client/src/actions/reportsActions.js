import axios from 'axios';

import {
	SEND_REPORT,
	SEND_REPORT_FALSE,
	GET_REPORTS,
	ARCHIVED_LOADING,
	GET_ERRORS
} from './types';

export const submitReport = (data, orgFeed) => dispatch => {
	axios.post('/api/reports/passReports', data)
	.then(res =>  dispatch({
		type: SEND_REPORT,
		payload: res.data
	}))
	.catch(err => dispatch({
		type:GET_ERRORS,
		payload: err.response.data
	}));

	 // if (res.status === 200) {
	 axios.post('/api/reports/sendOrgFeed', orgFeed)
	.then(res => res)
	.catch(err => console.log(err))
	
}

export const submitReportFalse = _ => {
	return { type: SEND_REPORT_FALSE }
}

export const getReports = _ => dispatch => {
	axios.get('/api/reports/')
	.then(res => dispatch({
		type: GET_REPORTS,
		payload: res.data
	}))
	.catch(err => console.log(err))
}

export const reportLoading = _ => {
	return { type: ARCHIVED_LOADING }
}