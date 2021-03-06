import {
    SET_CURRENT_USER,
    USER_LOADING,
} from "../actions/types";

const isEmpty = require("is-empty");

//InitialState
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

//Reducers
export default function (state = initialState, action) {
    switch (action.type) {
        //Authentication Reducer
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;

    }
}