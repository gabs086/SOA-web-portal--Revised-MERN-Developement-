import {
	GET_ORGDESC,
	ADD_ORGDESC,
	UPDATE_ORGDESC,
	DELETE_ORGDESC,
	RECORD_LOADING,
} from '../actions/types';


const initialState = { 
	added: false,
	updated: false,
	deleted: false,
	records:[],
	loading: false
};

export default function (state = initialState, action){
	switch(action.type){
		case GET_ORGDESC:
			return {
				...state,
				records: action.payload,
				loading:false
			};
		case ADD_ORGDESC:
			return {
				...state,
				added: true,
				records: [action.payload, ...state.records]
			};
		case DELETE_ORGDESC:
			return {
				...state,
				records: state.reports
							.filter(record => record.id !== action.payload)	
			}
		case RECORD_LOADING:
			return {
				...state,
				loading: true
			};
		default: 
			return state;
	};
};