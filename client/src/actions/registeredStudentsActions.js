import axios from 'axios';

import {
	SET_STUDENT_REGISTERED_ORG,
	SET_STUDENT_REGISTERED_ORG_FALSE, 

	SET_STUDENT_FULL_REQ,

	SET_STUDENT_REGISTERED_HEAD,
	SET_STUDENT_REGISTERED_HEAD_FALSE,
	SET_STUDENT_INACTIVE_HEAD,
	SET_STUDENT_INACTIVE_HEAD_FALSE,

	GET_ERRORS
} from './types';

export const registerStudent = (data, notif) => dispatch => {

	axios.post('/api/registeredStudents/registerStudent', data)
	.then(res => dispatch({
		type: SET_STUDENT_REGISTERED_ORG
	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
        payload: err.response.data,
	}));

	axios.post('/api/registeredStudents/sendNotifToOrg', notif)
	.then(res => res)
	.catch(err => console.log(err));

}

export const registerStudentFalse = _ => {
	return { type: SET_STUDENT_REGISTERED_ORG_FALSE }
}