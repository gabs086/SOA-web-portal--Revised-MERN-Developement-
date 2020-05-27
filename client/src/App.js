import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

//Redux
import { Provider } from "react-redux";
import store from "./store";

//Components
import Index from './components/Index';
// Student Dashboard Components
import StudentIndex from './components/st/StudentIndex';
import LostAndFoundContent from './components/st/LostAndFoundContent';
import LostItemForm from './components/st/LostItemForm';
import LostItemReports from './components/st/LostItemReports';
import FoundTable from './components/st/FoundTable';

// Student Organization Dashboard Components
import OrgIndex from './components/org/OrgIndex';

// SOA Head Dashboard Components
import HeadIndex from './components/h/HeadIndex';
import AnnounceEvent from './components/h/AnnounceEvents';
import LostAndFound from './components/h/LostAndFound';
import OrgList from './components/h/OrgList';
import RequestedActivities from './components/h/RequestedActivities';
import ActivityAssessment from './components/h/ActivityAssessment';
import LostOrFound from './components/h/LostOrFound';
import Found from './components/h/Found';
import AddFound from './components/h/AddFound';

// SOA Admin Dashboard Components
import AdminIndex from './components/ad/AdminIndex';
import AnnounceEvents from './components/ad/AnnounceEvents';
import OrgListAdmin from './components/ad/OrgListAdmin';
import RequestedActivitesAdmin from './components/ad/RequestedActivitiesAdmin';
import FilesAndReports from './components/ad/FilesAndReports';
import IDReplacement from './components/ad/IDReplacement';
import OrgAddForm from './components/ad/OrgAddForm';
import OrgUpdateForm from './components/ad/OrgUpdateForm';
import OrgAccountList from './components/ad/OrgAccountList';
import OrgAccountListAddForm from './components/ad/OrgAccountListAddForm';

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
          <PrivateRoute exact path="/st/lostandfoundpage/reportlostitem" component={LostItemForm} />
          <PrivateRoute exact path="/st/lostandfoundpage/reportslist" component={LostItemReports} />
          <PrivateRoute exact path="/st/lostandfoundpage/foundreportslist" component={FoundTable} />

          {/* Student Organization Route Pages  */}
          <PrivateRoute exact path="/org" component={OrgIndex} />

          {/* Head Organization Route Pages  */}
          <PrivateRoute exact path="/h" component={HeadIndex} />
          <PrivateRoute exact path="/h/announceevent" component={AnnounceEvent} />
          <PrivateRoute exact path="/h/lostandfound" component={LostOrFound} />
          <PrivateRoute exact path="/h/lostandfound/lostreports" component={LostAndFound} />
          <PrivateRoute exact path="/h/lostandfound/foundreports" component={Found} />
          <PrivateRoute exact path="/h/lostandfound/foundreports/addfoundrecord" component={AddFound} />
          <PrivateRoute exact path="/h/organizationlist" component={OrgList} />
          <PrivateRoute exact path="/h/requestedactivities" component={RequestedActivities} />
          <PrivateRoute exact path="/h/activityassessment" component={ActivityAssessment} />

          {/* Administration Page  */}
          <PrivateRoute exact path="/ad" component={AdminIndex} />
          <PrivateRoute exact path="/ad/announceevent" component={AnnounceEvents} />
          <PrivateRoute exact path="/ad/organizationlist" component={OrgListAdmin} />
          <PrivateRoute exact path="/ad/organizationlist/addrecord" component={OrgAddForm} />
          <PrivateRoute exact path="/ad/organizationlist/updaterecord/:id" component={OrgUpdateForm} />
          <PrivateRoute exact path="/ad/organizationlist/accountlist" component={OrgAccountList} />
          <PrivateRoute exact path="/ad/organizationlist/accountlist/registerorg" component={OrgAccountListAddForm} />
          <PrivateRoute exact path="/ad/requestedactivities" component={RequestedActivitesAdmin} />
          <PrivateRoute exact path="/ad/filesandreports" component={FilesAndReports} />
          <PrivateRoute exact path="/ad/idreplacement" component={IDReplacement} />

        </Switch>

      </Router>

    </Provider>
  );
}

export default App;
