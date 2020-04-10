import {
    ADD_LOST_REPORT,
    GET_LOST_REPORTS,
    REPORT_LOADING
} from '../actions/types';

// Initial State 
const initialState = {
    lost: false,
    found: false,
    reports: [],
    loading: false,
}

export default function (state = initialState, action){
    switch(action.type){
        case ADD_LOST_REPORT:
            return {
                ...state,
                lost: true,
                reports: [action.payload, ...state.reports]
                
            }
        case GET_LOST_REPORTS:
            return {
                ...state,
                reports: action.payload,
                loading: false
            }
        case REPORT_LOADING:
            return {
                ...state,
                loading: true
            }
        default: 
            return state;
    }
}