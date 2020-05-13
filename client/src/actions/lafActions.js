import axios from 'axios';

import { 
    ADD_LOST_REPORT,
    GET_LOST_REPORTS,
    REPORT_LOADING,
    GET_ERRORS,
    SET_REPORT_TO_FOUND,
    SET_REPORT_TO_CLAIMED
} from './types';

// Function for getting all the data in lost item report 
export const getLostReport = _ => dispatch => {
    dispatch(setReportLoading);
    axios.get('/api/laf/getreportlostitem')
    .then(res => dispatch({
        type: GET_LOST_REPORTS,
        payload: res.data
    }))
    .catch(err => console.log(err))
}

//Adding Data report to the reducer
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

// Set the id of the data to found status 

//With Redux
export const setReportToFound = (id, data) => dispatch => {
    axios.post(`/api/laf/setasfounditem/${id}`, data)
    .then(res => dispatch({
        type: SET_REPORT_TO_FOUND,
        payload:res.data
    }))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
    }));
}


// Set the id of the data to claimed status 
// With Redux 
export const setReportToClaimed = (id, data) => dispatch =>  {
    axios.post(`/api/laf/setasclaimeditem/${id}`, data)
    .then(res =>  dispatch({
         type: SET_REPORT_TO_CLAIMED,
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