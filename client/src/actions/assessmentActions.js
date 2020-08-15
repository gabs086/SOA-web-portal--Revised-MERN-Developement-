import axios from 'axios';

import {
	ADD_ASSESSMENT_ACTIVITY,
	ADD_ASSESSMENT_ACTIVITY_FALSE,

	UPDATE_ASSESSMENT_ACTIVITY,
	UPDATE_ASSESSMENT_ACTIVITY_FALSE,

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
