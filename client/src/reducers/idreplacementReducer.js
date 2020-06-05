import {
	GET_ID_REPLACEMENTS,
	ADD_ID_REPLACEMENT,
	// ID_FETCHED_BY_ID,
	UPDATE_ID_REPLACEMENT,
	ID_REPLACEMENT_LOADING
} from '../actions/types';

const initialState = {
	added: false,
	replaced: false,
	records: [],
	loading: false
};


export default function (state = initialState, action){
	switch(action.type){
		case GET_ID_REPLACEMENTS:
			return {
				...state,
				records: action.payload,
				loading: false
			};
		case ADD_ID_REPLACEMENT:
			return {
				...state,
				added: true,
				records: [action.payload, ...state.records]
			};
		// Fetched the state by its 
		// This will be a snippet for Redux search by id s
		// case ID_FETCHED_BY_ID:
		// 		return {
		// 			...state,
		// 			records: action.payload
		// 		};

		case UPDATE_ID_REPLACEMENT:
			return {
				...state,
				replaced: true,
				records: state.records.map((record, i) => i === 1 ? 
				{
					record: action.payload
				}
					: record
					)	
			};
		case ID_REPLACEMENT_LOADING: 
			return {
				...state,
				loading: true
			};
		default:
			return state;

	};
}