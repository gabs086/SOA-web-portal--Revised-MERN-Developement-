import { combineReducers } from "redux";

//Reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import lafReducer from './lafReducer';
import orgDescReducer from './orgDescReducer';
import orgReducer from './orgReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    laf: lafReducer,
    orgDesc: orgDescReducer,
    org: orgReducer
});