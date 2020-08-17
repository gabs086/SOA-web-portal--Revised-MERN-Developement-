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
	SET_ASSESSMENT_PENDING_FALSE

} from '../actions/types';

const initialState = {
	added: false,
	updated: false,

	approved: false,
	declined: false,

	pendingAgain: false,
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

		case SET_ASSESSMENT_APPROVED:
			return {
				...state,
				approved: true
			}
		case SET_ASSESSMENT_APPROVED_FALSE:
			return {
				...state,
				approved: false
			}
		case SET_ASSESSMENT_DECLINED:
			return {
				...state,
				declined: true
			}
		case SET_ASSESSMENT_DECLINED_FALSE:
			return {
				...state,
				declined: false
			}

		case SET_ASSESSMENT_PENDING:
			return {
				...state,
				pendingAgain:  true
			}
		case SET_ASSESSMENT_PENDING_FALSE:
			return {
				...state,
				pendingAgain:false
			}

		default:
			return state
	}
}