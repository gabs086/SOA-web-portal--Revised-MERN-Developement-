import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//ACTION TYPES FOR REDUCER
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

//Login user
export const loginUser = userData => dispatch => {
    axios.post("/api/users/login", userData)
        .then(res => {
            //Saving the token in localstorage
            //For user authentication of token
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            setAuthToken(token);
            // Decoding of token 
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({

            //  Error 
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// Set logged in user
export const setCurrentUser = decoded => {
    return { type: SET_CURRENT_USER, payload: decoded };
};

// User Loading action 
export const setUserLoading = _ => {
    return { type: USER_LOADING };
};

// Logout User Action 
export const logoutUser = _ => dispatch => {
    //Removing token auth
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}
