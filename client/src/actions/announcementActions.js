import axios from 'axios';

import {
	ADD_ANNOUNCEMENT_ADMIN,
	ADD_ANNOUNCEMENT_ADMIN_FALSE,

	UPDATE_ANNOUNCEMENT_ADMIN,
	UPDATE_ANNOUNCEMENT_ADMIN_FALSE,

	DELETE_ANNOUNCEMENT_ADMIN,
	DELETE_ANNOUNCEMENT_ADMIN_FALSE,

	GET_ERRORS
} from './types';

export const addAnnouncement = data => dispatch => {
	axios.post('/api/announcements/addEvents', data)
	.then(res => dispatch({
		type: ADD_ANNOUNCEMENT_ADMIN,
	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
}
export const addAnnouncementFalse = _ => {
	return {
		type: ADD_ANNOUNCEMENT_ADMIN_FALSE
	}
}

export const updateAnnouncement = (id,data) => dispatch => {
	axios.post(`/api/announcements/updateannouncement/${id}`, data)
	.then(res => dispatch({
		type:UPDATE_ANNOUNCEMENT_ADMIN
	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
}

export const updateAnnouncementFalse = _ => {
	return {
		type: UPDATE_ANNOUNCEMENT_ADMIN_FALSE
	}
}