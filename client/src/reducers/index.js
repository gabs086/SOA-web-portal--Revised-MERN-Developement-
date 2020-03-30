import { combineReducers } from "redux";

//Reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import lafReducer from './lafReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    laf: lafReducer
});