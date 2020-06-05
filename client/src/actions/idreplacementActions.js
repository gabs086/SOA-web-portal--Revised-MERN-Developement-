import axios from 'axios';

import { 
	GET_ID_REPLACEMENTS,
	ADD_ID_REPLACEMENT,
	// ID_FETCHED_BY_ID,
	UPDATE_ID_REPLACEMENT,
	ID_REPLACEMENT_LOADING,
	GET_ERRORS
} from './types';

//ACtion for getting all ther data of reports
export const getIdReplacements = _ => dispatch => {
	dispatch(setIdReplacementsLoading);
	axios.get('/api/idreplacements/getidrecords')
	.then(res => dispatch({
		type: GET_ID_REPLACEMENTS,
		payload: res.data
	}))
	.catch(err => console.log(err));
};


//Action for getting the idreplacement data with is specific id
// export const getIdReplacementsById = id => dispatch => {
// 	dispatch(setIdReplacementsLoading);
// 	axios.get(`/api/idreplacements/getidrecords/${id}`)
// 	.then(res => dispatch({
// 		type:ID_FETCHED_BY_ID,
// 		payload: res.data
// 	}))
// 	.catch(err => dispatch({
// 		type: GET_ERRORS,
// 		payload: err.response.data
// 	}));
// };

// Action for POST at idreplacements
export const addIdReplacment = replacement => dispatch => {
	axios.post('/api/idreplacements/addidrecords', replacement)
	.then(res => dispatch({
		type:ADD_ID_REPLACEMENT,
		payload: res.data
	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
};

//Update the idreplacement data by its specific ID
export const updateIdReplacement = (id, replacement) => dispatch => {
	axios.post(`/api/idreplacements/updateidrecord/${id}`, replacement)
	.then(res => dispatch({
		type: UPDATE_ID_REPLACEMENT,
		payload: res.data
	}))
	.catch(err => dispatch({
		type:GET_ERRORS,
		payload: err.response.data
	}))
};

export const setIdReplacementsLoading = _ => {
	return { type: ID_REPLACEMENT_LOADING }
};