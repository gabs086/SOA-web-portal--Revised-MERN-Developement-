import {
	GET_ORG_ACCNTS,
	REGISTER_ORG_ACCNT,
	// REGISTER_ACCNT,
	ACCNTS_LOADING
} from '../actions/types';

const initialState = {
	registered: false,
	accounts: [],
	loading: false
};

export default function(state = initialState, action){
	switch(action.type) {	
		// Reducer for getting all the accounts registered
		case GET_ORG_ACCNTS:
			return {
				...state,
				accounts: action.payload,
				loading: false
			};
		//Reducer for Adding an account to a database
		//This for the whole process of registering an account
		case REGISTER_ORG_ACCNT:
			return {
				...state,
				registered: true,
				accounts: [action.payload, ...state.accounts],
			};
		case ACCNTS_LOADING:
			return {
				...state,
				loading: true
			};
			default: 
				return state;
	}
};