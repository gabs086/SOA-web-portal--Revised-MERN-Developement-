import axios from 'axios';

import {
	GET_ORGDESC,
	ADD_ORGDESC,
	DELETE_ORGDESC,
	RECORD_LOADING,
	GET_ERRORS,
} from './types';


// Function for getting all the record off all organization 
export const getOrgDesc = _ => dispatch => {
	dispatch(setRecordLoading);
	axios.get('/api/orgdesc/getorgdesc')
	.then(res => dispatch({
		type: GET_ORGDESC,
		payload: res.data
	}))
	.catch(err => console.log(err));
};

// Function for adding data of organization in the data table 
export const addOrgDesc = orgdesc => dispatch => {
	axios.post('/api/orgdesc/addorganization', orgdesc)
	.then(res => 
		dispatch({
			type: ADD_ORGDESC,
			payload: res.data
		}))
	.catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
    }));   
};

// Function for deleting a specific data in the data table
export const deleteOrgDesc = id => dispatch => {
	axios.delete(`/api/orgdesc/deleteorganization/${id}`)
	.then( res => dispatch({
		type: DELETE_ORGDESC,
		payload: res.data
	}))	
	.catch(err => console.log(err));
};

export const setRecordLoading = _ => {
	return { type: RECORD_LOADING }
};