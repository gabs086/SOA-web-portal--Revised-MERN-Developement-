import {
    ADD_LOST_REPORT
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
                
            };
        default: 
            return state;
    }
}