import axios from 'axios';

import { 
    ADD_LOST_REPORT,
    GET_LOST_REPORTS,
    REPORT_LOADING,
    GET_ERRORS,
    SET_REPORT_TO_FOUND,
    SET_REPORT_TO_CLAIMED,
    ADD_FOUND_REPORT,
    GET_FOUND_REPORTS,
    DELETE_FOUND_REPORT 
} from './types';

// Function for getting all the data in lost item report 
export const getLostReport = _ => dispatch => {
    dispatch(setReportLoading);
    axios.get('/api/lost/getreportlostitem')
    .then(res => dispatch({
        type: GET_LOST_REPORTS,
        payload: res.data
    }))
    .catch(err => console.log(err))
};

//Adding Data report to the reducer
export const addLostReport = lostReports => dispatch => {
    axios.post('/api/lost/reportlostitem', lostReports)
    .then(res =>
        dispatch({
            type: ADD_LOST_REPORT,
            payload: res.data
        }))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
    }));   
};

// Set the id of the data to found status 
export const setReportToFound = (id, data) => dispatch => {
    axios.post(`/api/lost/setasfounditem/${id}`, data)
    .then(res => dispatch({
        type: SET_REPORT_TO_FOUND,
        payload:res.data
    }))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
    }));
};


// Set the id of the data to claimed status 
export const setReportToClaimed = (id, data) => dispatch =>  {
    axios.post(`/api/lost/setasclaimeditem/${id}`, data)
    .then(res =>  dispatch({
         type: SET_REPORT_TO_CLAIMED,
         payload: res.data
    }))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
    }));
};

//Getting the reports for found item process
export const getFoundReports = _ => dispatch => {
    dispatch(setReportLoading);
    axios.get('/api/found/getreportfounditem')
    .then(res => dispatch({
        type: GET_FOUND_REPORTS,
        payload: res.data
    }))
    .catch(err => console.log(err))
};

//Function for adding found item records with reducer
export const addFoundReports = foundReports => dispatch => {
 axios.post('/api/found/addfoundreport', foundReports)
    .then(res =>
        dispatch({
            type: ADD_FOUND_REPORT,
            payload: res.data
        }))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
    }));  
};

//Deleting a specific found report by its id
export const deleteFoundReport = id => dispatch => {
    axios.delete(`/api/found/deletefoundreport/${id}`)
    .then(res => dispatch({
        type: DELETE_FOUND_REPORT,
        payload: res.data
    }))
    .catch(err => console.log(err));
};

export const setReportLoading = _ => {
    return { type: REPORT_LOADING }
};