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

	SET_ASSESSMENT_PENDING,
	SET_ASSESSMENT_PENDING_FALSE,

	GET_ASSESSMENT_ACTIVITIES,
	ASSESSMENT_LOADING,

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

export const updateActivityAssessment = (id, data) => dispatch => {

	axios.post(`/api/assessments/updateActivity/${id}`, data)
	.then(res => dispatch({
		type: UPDATE_ASSESSMENT_ACTIVITY
	}))
	.catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
    }));  
}

export const updateActivityAssessmentFalse = _ => {
	return { type: UPDATE_ASSESSMENT_ACTIVITY_FALSE };
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

export const setAsDeclined = (id, data, notif) => dispatch => {
	axios.post(`/api/assessments/setAsDeclined/${id}`, data)
	.then(res => dispatch({
		type: SET_ASSESSMENT_DECLINED
	}))
	.catch(err => console.log(err))

	axios.post('/api/assessments/activityAssessmentDeclined/notif', notif)
	.then(res => res)
	.catch(err => err);
}

export const setAsDeclinedFalse = _ => {
	return { type: SET_ASSESSMENT_DECLINED_FALSE }
}

export const setAgainToPending = (id, data, notif) => dispatch => {
	axios.post(`/api/assessments/setAgainToPending/${id}`, data)
	.then(res => dispatch({
		type: SET_ASSESSMENT_PENDING
	}))
	.catch(err => console.log(err));

	axios.post('/api/assessments/activityAssessment/notif', notif)
	.then(res => res)
	.catch(err => err);
}

export const setAgainToPendingFalse = _ => {
	return { type: SET_ASSESSMENT_DECLINED_FALSE }
}


