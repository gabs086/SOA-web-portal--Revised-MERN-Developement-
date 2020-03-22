import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

//Redux
import { Provider } from "react-redux";
import store from "./store";

//Components
import Index from './components/Index';

import StudentIndex from './components/st/StudentIndex';
import LostAndFoundContent from './components/st/LostAndFoundContent';
import LostItemForm from './components/st/LostItemForm';

import OrgIndex from './components/org/OrgIndex';

import HeadIndex from './components/h/HeadIndex';

import AdminIndex from './components/ad/AdminIndex';

//PrivateRoute
import PrivateRoute from './private-route/PrivateRoute';

//Authentication
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));


  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./";
  }
}

function App() {
  return (
    <Provider store={store}>

      <Router>
        <Route exact path="/" component={Index} />

        {/* Private Routes  */}
        <Switch>
          {/* Student Route Pages  */}
          <PrivateRoute exact path="/st" component={StudentIndex} />
          <PrivateRoute exact path="/st/lostandfoundpage" component={LostAndFoundContent} />
          <PrivateRoute exact path="/st/reportlostitem" component={LostItemForm} />

          {/* Student Organization Route Pages  */}
          <PrivateRoute exact path="/org" component={OrgIndex} />

          {/* Head Organization Route Pages  */}
          <PrivateRoute exact path="/h" component={HeadIndex} />

          {/* Administration Page  */}
          <PrivateRoute exact path="/ad" component={AdminIndex} />
        </Switch>

      </Router>

    </Provider>
  );
}

export default App;
