import axios from 'axios';

import {
	GET_ORG_FEEDS,
	GET_REQUEST_ACTIVITIES,
	SUBMIT_REQUEST_ACTIVITIES,
	REQUEST_ACTIVITIES_LOADING
} from './types';

export const getOrgFeeds = _ => dispatch => {
	dispatch(setRecordLoading);
	axios.get('/api/requestactivities/getorgfeeds')
	.then(res => dispatch({
		type: GET_ORG_FEEDS,
		payload: res.data
	}))
	.catch(err => err);
};

export const setRecordLoading = _ => {
	return { type: REQUEST_ACTIVITIES_LOADING }
};