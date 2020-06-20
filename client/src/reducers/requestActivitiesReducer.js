import {
	// Org Part 
	GET_ORG_FEEDS,
	GET_REQUEST_ACTIVITIES,
	SUBMIT_REQUEST_ACTIVITIES,

	// SOA HEAD PARt
	COUNT_REQUEST_ACTIVITIES_NOTIF,
	// SOA ADMIN PART 

	REQUEST_ACTIVITIES_LOADING
} from '../actions/types';

const initialState = {
	submitted: false,
	records: [],
	feeds:[],
	loading: false,
	countNotif: 0
};

export default function(state = initialState, action){
	switch(action.type){
		// Org Part 

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

		// SOA Head PArt 
		case COUNT_REQUEST_ACTIVITIES_NOTIF: 
			return {
				...state,
				// Set the countNotif State with the response of count object in the action 
				countNotif: action.payload
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