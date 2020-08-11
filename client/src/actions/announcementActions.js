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

//Admin
export const addAnnouncement = data => dispatch => {
	axios.post('/api/announcements/addEvents', data)
	.then(res => dispatch({
		type: ADD_ANNOUNCEMENT_ADMIN,
		payload: res.data,
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

export const deleteAnnouncement = id => dispatch => {
	axios.delete(`/api/announcements/deleteannouncement/${id}`)
	.then(res => dispatch({
		type: DELETE_ANNOUNCEMENT_ADMIN
	}))
	.catch(err => console.log(err));
}

export const deleteAnnouncementFalse = _ => {
	return  { type: DELETE_ANNOUNCEMENT_ADMIN_FALSE }
}

// Head
export const addAnnouncementHead = data => dispatch => {
	axios.post('/api/announcements/addEvents', data)
	.then(res => dispatch({
		type: ADD_ANNOUNCEMENT_ADMIN,
		payload: res.data
	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
	// .catch(err => console.log(err.response))
}
export const addAnnouncementFalseHead = _ => {
	return {
		type: ADD_ANNOUNCEMENT_ADMIN_FALSE
	}
}

export const updateAnnouncementHead = (id,data) => dispatch => {
	axios.post(`/api/announcements/updateannouncement/${id}`, data)
	.then(res => dispatch({
		type:UPDATE_ANNOUNCEMENT_ADMIN,	
		payload: res.data
	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
}

export const updateAnnouncementFalseHead = _ => {
	return {
		type: UPDATE_ANNOUNCEMENT_ADMIN_FALSE
	}
}

