import axios from 'axios';

import {
	GET_ORG_ACCNTS,
	REGISTER_ORG_ACCNT,
	ACCNTS_LOADING,
	GET_ERRORS,
} from './types';

export const getAccntRecords = _ => dispatch => {
	dispatch(setAccountsLoading);
	axios.get('/api/org/getorgaccnts')
	.then(res => dispatch({
		type: GET_ORG_ACCNTS,
		payload: res.data
	}))
	.catch(err => console.log(err));
};

// The actions for adding a account in the database 
export const addAccntRecords = data => dispatch => {
	axios.post('/api/org/registerorg', data)
	.then(res => dispatch({
		type: REGISTER_ORG_ACCNT,
		payload: res.data
	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
        payload: err.response.data,
	}));
};

export const setAccountsLoading = _ => {
	return { type: ACCNTS_LOADING };
};