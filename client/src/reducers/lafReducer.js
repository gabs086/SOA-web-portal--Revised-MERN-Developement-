import {
    ADD_LOST_REPORT,
    GET_LOST_REPORTS,
    REPORT_LOADING,
    SET_REPORT_TO_FOUND ,
    SET_REPORT_TO_CLAIMED,
    GET_FOUND_REPORTS,
    ADD_FOUND_REPORT
} from '../actions/types';

// Initial State 
const initialState = {
    lost: false,
    found: false,
    reports: [],
    loading: false,
    error: false,
}

export default function (state = initialState, action){
    switch(action.type){
        // Reducer for adding a lost item report 
        case ADD_LOST_REPORT:
            return {
                ...state,
                lost: true,
                reports: [action.payload, ...state.reports]
            };
        // Reducers for making the data set to found or claimed
        case SET_REPORT_TO_FOUND:
            return{
                ...state,
                reports: state.reports.map((report,i) => i === 1 ? 
                    {
                        ...report, 
                    status: action.payload,
                      } 
                    : report)
            };
        case SET_REPORT_TO_CLAIMED:
            return{
                ...state,
                reports: state.reports.map((report,i) => i === 1 ? 
                    {
                        ...report, 
                        status: action.payload,
                    } 
                    : report)
            };
        // Reducer for getting all the data reports 
        case GET_LOST_REPORTS:
            return {
                ...state,
                reports: action.payload,
                loading: false,
            };

        //Case Statements for Found Reports
        case GET_FOUND_REPORTS:
            return {
                ...state,
                reports: action.payload,
                loading: false,
            };
        case ADD_FOUND_REPORT: 
            return  {
                ...state,
                found: true,
                reports: [action.payload, ...state.reports]
            }
        case REPORT_LOADING:
            return {
                ...state,
                loading: true
            };
        default: 
            return state;
    }
}