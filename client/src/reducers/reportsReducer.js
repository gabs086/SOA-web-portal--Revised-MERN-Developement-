import {
	SEND_REPORT,
	SEND_REPORT_FALSE,
	GET_REPORTS,
	ARCHIVED_LOADING
} from '../actions/types';

const initialState = {
	submitted: false,
	records: [],
	loading: false
};

export default function (state = initialState, action) {
		switch(action.type){
			case GET_REPORTS:
				return {
					...state,
					records: action.payload,
					loading: false
				}
			case SEND_REPORT:
				return {
					...state,
					submitted: true,
					records: [action.payload, ...state.records]
				}
			case SEND_REPORT_FALSE: 
				return {
					...state,
					submitted: false,
				}
			case ARCHIVED_LOADING:
				return {
					...state,
					loading: true
				}
			default:
				return  state
		}
}