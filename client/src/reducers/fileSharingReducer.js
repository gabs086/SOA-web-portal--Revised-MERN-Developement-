import {
	SHARE_FILES,
	SHARE_FILES_FALSE,

	GET_SHARED,
	GET_SHARED_FILES_STUDENTS,
	GET_SHARED_FILES_ORG,

	SHARED_FILES_LOADING,
	SHARED_FILES_LOADING_STUDENT,
	SHARED_FILES_LOADING_ORG

} from '../actions/types';

const initialState = {
	shared: false,
	orgs: [],
	students: [],
	records: [],
	loading: false,
	loadingStudent: false,
	loadingOrg: false
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SHARE_FILES:
			return {
				...state,
				shared: true,
				records: [action.payload, ...state.records]
			}
		case SHARE_FILES_FALSE:
			return {
				...state,
				shared: false
			}

		case GET_SHARED:
			return {
				...state,
				records: action.payload,
				loading: false
			}
		case GET_SHARED_FILES_STUDENTS:
			return {
				...state,
				students: action.payload,
				loadingStudent: false
			}
		case GET_SHARED_FILES_ORG:
			return {
				...state,
				orgs: action.payload,
				loadingOrg: false
			}

		case SHARED_FILES_LOADING:
			return {
				...state,
				loading: true
			}
		case SHARED_FILES_LOADING_STUDENT:
			return {
				...state,
				loadingStudent: true
			}
		case SHARED_FILES_LOADING_ORG:
			return {
				...state,
				loadingOrg: true
			}

		default:
			return state;
	}
}