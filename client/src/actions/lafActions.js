import axios from 'axios';

import { 
    ADD_LOST_REPORT,
    REPORT_LOADING,

    GET_ERRORS
} from './types';

export const addLostReport = lostReports => dispatch => {
    axios.post('/api/laf/reportlostitem', lostReports)
    .then(res =>
        dispatch({
            type: ADD_LOST_REPORT,
            payload: res.data
        }))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
    }));   
}

export const setReportLoading = _ => {
    return { type: REPORT_LOADING }
}