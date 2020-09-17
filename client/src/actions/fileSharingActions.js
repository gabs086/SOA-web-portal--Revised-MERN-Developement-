import axios from 'axios';

import {
	SHARE_FILES,
	SHARE_FILES_FALSE,

	DELETE_SHARE_FILES,
	DELETE_SHARE_FILES_FALSE,

	GET_SHARED,
	GET_SHARED_FILES_STUDENTS,
	GET_SHARED_FILES_ORG,

	SHARED_FILES_LOADING,
	SHARED_FILES_LOADING_STUDENT,
	SHARED_FILES_LOADING_ORG,

	GET_ERRORS
} from './types';

export const loadingFiles = _ => {
	return { type: SHARED_FILES_LOADING}
}

export const getRecords = _ => dispatch => {
	dispatch(loadingFiles)
	axios.get('/api/fileSharings/')
	.then(res => dispatch({
		type: GET_SHARED,
		payload: res.data
	}))
	.catch(err => err)
}

//post shared files
export const shareFiles = data => dispatch => {
	axios.post('/api/fileSharings/shareFiles', data)
	.then(res => dispatch({
		type: SHARE_FILES,
		payload: res.data
	}))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}))
}

export const shareFilesFalse = _ => {
	return { type: SHARE_FILES_FALSE }
};

//Delete Share Files
export const deleteFiles = id => dispatch => {
	axios.delete(`/api/fileSharings/deleteSharedFiles/${id}`)
	.then(res => dispatch({
		type: DELETE_SHARE_FILES,
		payload: res.data
	}))
	.catch(err => console.log(err))
}

export const deleteFilesFalse = _ => {
	return {  type: DELETE_SHARE_FILES_FALSE }
}