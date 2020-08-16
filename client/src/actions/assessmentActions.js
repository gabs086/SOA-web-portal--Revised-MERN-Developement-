import axios from 'axios';

import {
	ADD_ASSESSMENT_ACTIVITY,
	ADD_ASSESSMENT_ACTIVITY_FALSE,

	UPDATE_ASSESSMENT_ACTIVITY,
	UPDATE_ASSESSMENT_ACTIVITY_FALSE,

	SET_ASSESSMENT_APPROVED,
	SET_ASSESSMENT_APPROVED_FALSE,

	SET_ASSESSMENT_DECLINED,
	SET_ASSESSMENT_DECLINED_FALSE,

	GET_ERRORS,
} from './types';

export const addActivityAssessment = data => dispatch => {

	axios.post('/api/assessments/addActivity', data)
	.then(res => 
		dispatch({
			type: ADD_ASSESSMENT_ACTIVITY,
		}))
	.catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
    }));  
}

export const addActivityAssessmentFalse = _ => {
	return { type: ADD_ASSESSMENT_ACTIVITY_FALSE }
}

//Approved and Declined Actions
export const setAsApproved = (id, data, notif) => dispatch => {
	axios.post(`/api/assessments/setAsApproved/${id}`, data)
	.then(res => dispatch({
		type: SET_ASSESSMENT_APPROVED
	}))
	.catch(err => console.log(err));

	axios.post('/api/assessments/activityAssessment/notif', notif)
	.then(res => res)
	.catch(err => err);
}

export const setAsApprovedFalse = _ => {
	return { type: SET_ASSESSMENT_APPROVED_FALSE }
}

export const setAsDeclined = (id, data) => dispatch => {
	axios.post(`/api/assessments/setAsDeclined/${id}`, data)
	.then(res => dispatch({
		type: SET_ASSESSMENT_DECLINED
	}))
	.catch(err => console.log(err))
}

export const setAsDeclinedFalse = _ => {
	return { type: SET_ASSESSMENT_DECLINED_FALSE }
}
