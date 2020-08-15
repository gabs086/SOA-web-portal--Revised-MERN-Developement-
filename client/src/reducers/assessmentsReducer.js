import {
	ADD_ASSESSMENT_ACTIVITY,
	ADD_ASSESSMENT_ACTIVITY_FALSE,

	UPDATE_ASSESSMENT_ACTIVITY,
	UPDATE_ASSESSMENT_ACTIVITY_FALSE,

	GET_ASSESSMENT_ACTIVITY,

	ASSESSMENT_LOADING
} from '../actions/types';

const initialState = {
	added: false,
	updated: false,
};

export default function (state = initialState, action) {
	switch(action.type){
		case ADD_ASSESSMENT_ACTIVITY:
			return {
				...state,
				added: true,
			}
		case ADD_ASSESSMENT_ACTIVITY_FALSE:
			return {
				...state,
				added: false
			}

		default:
			return state
	}
}