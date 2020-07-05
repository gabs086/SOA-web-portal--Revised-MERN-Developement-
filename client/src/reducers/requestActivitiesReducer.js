import {
	// Org Part 
	GET_ORG_FEEDS,
	GET_REQUEST_ACTIVITIES,
	SUBMIT_REQUEST_ACTIVITIES,

	// SOA HEAD PARt
	COUNT_REQUEST_ACTIVITIES_NOTIF,
	GET_REQUEST_ACTIVITIES_HEAD,
	UPDATE_COUNT_NOTIF,
	SET_APPROVED_REQUEST_ACTIVITIES_HEAD,
	SET_DECLINED_REQUEST_ACTIVITIES_HEAD,
	// SOA ADMIN PART 

	REQUEST_ACTIVITIES_LOADING
} from '../actions/types';

const initialState = {
	//Org Part
	submitted: false,
	records: [],
	feeds:[],

	// SOA Head Part 
	request: [],
	approvedByHead: false,
	declinedByHead: false,
	countNotif: 0,

	loading: false,
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
		case GET_REQUEST_ACTIVITIES_HEAD:
			return {
				...state,
				request: action.payload,
				loading: false
			};
		case UPDATE_COUNT_NOTIF:
			return {
				...state,
				countNotif: action.payload
			};
		case SET_APPROVED_REQUEST_ACTIVITIES_HEAD:
			return {
				...state,
				approvedByHead: true
			};
		case SET_DECLINED_REQUEST_ACTIVITIES_HEAD:
			return {
				...state,
				declinedByHead: true
			}

		case REQUEST_ACTIVITIES_LOADING: 
			return {
				...state,
				loading: true,
			};
		default:
			return state;	
	}
};