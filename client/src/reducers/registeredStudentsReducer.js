import {
SET_STUDENT_REGISTERED_ORG,
SET_STUDENT_REGISTERED_ORG_FALSE, 

SET_STUDENT_FULL_REQ,

SET_STUDENT_REGISTERED_HEAD,
SET_STUDENT_REGISTERED_HEAD_FALSE,
SET_STUDENT_INACTIVE_HEAD,
SET_STUDENT_INACTIVE_HEAD_FALSE
} from '../actions/types';

const initialState = { 
	registered: false,
	fullReq: false,

	registererdInHead: false,
	inactive: false
};

export default function (state = initialState, action) {
		switch(action.type){
			case SET_STUDENT_REGISTERED_ORG:
				return {
					...state,
					registered: true
				};
			case SET_STUDENT_REGISTERED_ORG_FALSE:
				return {
					...state,
					registered: false
				}

			default:
				return state;
		}
	}
