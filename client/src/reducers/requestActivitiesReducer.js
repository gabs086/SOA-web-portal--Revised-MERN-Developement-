import {
	GET_ORG_FEEDS,
	GET_REQUEST_ACTIVITIES,
	SUBMIT_REQUEST_ACTIVITIES,
	REQUEST_ACTIVITIES_LOADING
} from '../actions/types';

const initialState = {
	submitted: false,
	records: [],
	feeds:[],
	loading: false,
};

export default function(state = initialState, action){
	switch(action.type){
		//Reducer for getting the feeds in the database
		case GET_ORG_FEEDS: 
		return	{
			...state,
			feeds: action.payload,
			loading: false
		};
		//Reducer for getting the submitted records in the database
		case GET_REQUEST_ACTIVITIES: 
			return {
			...state,
			records: action.payload,
			loading: false,
		};
		//Reducer for submitting a request activity in the system
		case SUBMIT_REQUEST_ACTIVITIES: 
			return {
				...state,
				submitted: true,
				records: [action.payload, ...state.records]
			};
		case REQUEST_ACTIVITIES_LOADING: 
			return {
				...state,
				loading: true,
			};
		default:
			return state;	
	}
};