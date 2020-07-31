import { combineReducers } from "redux";

//Reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import lafReducer from './lafReducer';
import orgDescReducer from './orgDescReducer';
import orgReducer from './orgReducer';
import idreplacementReducer from './idreplacementReducer';
import requestActivitiesReducer from './requestActivitiesReducer';
import announcementReducer from './announcementReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    laf: lafReducer,
    orgDesc: orgDescReducer,
    org: orgReducer,
    idreplacement: idreplacementReducer,
    requestActivities: requestActivitiesReducer,
    announcement: announcementReducer
});