import {
	ADD_ANNOUNCEMENT_ADMIN,
	ADD_ANNOUNCEMENT_ADMIN_FALSE,

	UPDATE_ANNOUNCEMENT_ADMIN,
	UPDATE_ANNOUNCEMENT_ADMIN_FALSE,

	DELETE_ANNOUNCEMENT_ADMIN,
	DELETE_ANNOUNCEMENT_ADMIN_FALSE,

	ADD_ANNOUNCEMENT_HEAD,
	ADD_ANNOUNCEMENT_HEAD_FALSE,

	UPDATE_ANNOUNCEMENT_HEAD,
	UPDATE_ANNOUNCEMENT_HEAD_FALSE,


} from '../actions/types';

const initialState = {
	added: false,
	updated: false,
	deleted: false,
};

export default function(state = initialState, action) {
	switch(action.type) {
		case ADD_ANNOUNCEMENT_ADMIN:
			return {
				...state,
				added:true
			};
		case ADD_ANNOUNCEMENT_ADMIN_FALSE: 
			return {
				...state,
				added: false,
			};

		case UPDATE_ANNOUNCEMENT_ADMIN: 
			return {
				...state,
				updated: true
			};
		case UPDATE_ANNOUNCEMENT_ADMIN_FALSE:
			return {
				...state,
				updated: false
			};

		case DELETE_ANNOUNCEMENT_ADMIN: 
			return {
				...state,
				deleted: true
			};
		case DELETE_ANNOUNCEMENT_ADMIN_FALSE: 
			return {
				...state,
				deleted: false
			}

		default: 
			return state;
	}	
};
	