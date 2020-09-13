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
import StudentCalendar from './components/st/StudentCalendar';
import StudentEventSingle from './components/st/StudentEventSingle';
import StudentEvents from './components/st/StudentEvents';
import Activities from './components/st/Activities';
import JoinActivity from './components/st/JoinActivity';

// Student Organization Dashboard Components
import OrgIndex from './components/org/OrgIndex';
import ActivityRequestReports from './components/org/ActivityRequestReports';
import RequestActivityComponent from './components/org/RequestActivityComponent';
import OrgNotifications from './components/org/OrgNotifications';
import CalendarOrg from './components/org/CalendarOrg';
import OrgEventSingle from './components/org/OrgEventSingle';
import OrgEvents from './components/org/OrgEvents';
import Assessment from './components/org/Assessment';
import AddAssessment from './components/org/AddAssessment';
import CheckRegisteredStudentsOrg from './components/org/CheckRegisteredStudentsOrg';
import UpdateAssessment from './components/org/UpdateAssessment';
import SendOrgReports from './components/org/SendOrgReports';

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
import HeadEventSingle from './components/h/HeadEventSingle';
import HeadEvents from './components/h/HeadEvents';
import AddEventFormHead from './components/h/AddEventFormHead';
import UpdateEventFormHead from './components/h/UpdateEventFormHead';
import CheckRegisteredStudents from './components/h/CheckRegisteredStudents';

// SOA Admin Dashboard Components
import AdminIndex from './components/ad/AdminIndex';
import AnnounceEvents from './components/ad/AnnounceEvents';
import AddEventForm from './components/ad/AddEventForm';
import UpdateEventForm from './components/ad/UpdateEventForm';
import OrgListAdmin from './components/ad/OrgListAdmin';
import RequestedActivitesAdmin from './components/ad/RequestedActivitiesAdmin';
import FilesAndReports from './components/ad/FilesAndReports';
import IDReplacement from './components/ad/IDReplacement';
import OrgAddForm from './components/ad/OrgAddForm';
import OrgUpdateForm from './components/ad/OrgUpdateForm';
import OrgAccountList from './components/ad/OrgAccountList';
import OrgAccountListAddForm from './components/ad/OrgAccountListAddForm';
import IDReplacementAddForm from './components/ad/IDReplacementAddForm';
import IDReplacementUpdateForm from './components/ad/IDReplacementUpdateForm';
import AdminEventSingle from './components/ad/AdminEventSingle';
import AdminEvents from './components/ad/AdminEvents';
import ViewOrgReports from  './components/ad/ViewOrgReports';
import ShareFiles from './components/ad/ShareFiles';

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
          <PrivateRoute exact path="/st/events" component={StudentCalendar} />
          <PrivateRoute exact path="/st/events/:id" component={StudentEventSingle} />
          <PrivateRoute exact path="/st/listOfEvents/:dateDate" component={StudentEvents} />
          <PrivateRoute exact path="/st/activities" component={Activities} />
          <PrivateRoute exact path="/st/activities/:id/:activity" component={JoinActivity} />

          {/* Student Organization Route Pages  */}
          <PrivateRoute exact path="/org" component={OrgIndex} />
          <PrivateRoute exact path="/org/activitysections" component={ActivityRequestReports} />
          <PrivateRoute exact path="/org/activitysections/requestactivities" component={RequestActivityComponent} />
          <PrivateRoute exact path="/org/notifications" component={OrgNotifications} />
          <PrivateRoute exact path="/org/calendar" component={CalendarOrg} />
          <PrivateRoute exact path="/org/calendar/:id" component={OrgEventSingle} />
          <PrivateRoute exact path="/org/calendar/listOfEvents/:dateDate" component={OrgEvents} />
          <PrivateRoute exact path="/org/assessment" component={Assessment} />
          <PrivateRoute exact path="/org/assessment/addActivity" component={AddAssessment} />
          <PrivateRoute exact path="/org/assessment/:activityId/:activityTitle" component={CheckRegisteredStudentsOrg} />
          <PrivateRoute exact path="/org/assessment/:id" component={UpdateAssessment} />
          <PrivateRoute exact path="/org/sendArchive" component={SendOrgReports} />

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
          <PrivateRoute exact path="/h/calendar/:id" component={HeadEventSingle} />
          <PrivateRoute exact path="/h/calendar/listOfEvents/:dateDate" component={HeadEvents} />
          <PrivateRoute exact path="/h/announceevent/addEvent" component={AddEventFormHead} />
          <PrivateRoute exact path="/h/announceevent/updateEvent/:id" component={UpdateEventFormHead} />
          <PrivateRoute exact path="/h/activityassessment/:activityId/:activityTitle" component={CheckRegisteredStudents} />

          {/* Administration Page  */}
          <PrivateRoute exact path="/ad" component={AdminIndex} />
          <PrivateRoute exact path="/ad/announceevent" component={AnnounceEvents} />
          <PrivateRoute exact path="/ad/announceevent/addevent" component={AddEventForm} />
          <PrivateRoute exact path="/ad/announceevent/updateevent/:id" component={UpdateEventForm} />
          <PrivateRoute exact path="/ad/organizationlist" component={OrgListAdmin} />
          <PrivateRoute exact path="/ad/organizationlist/addrecord" component={OrgAddForm} />
          <PrivateRoute exact path="/ad/organizationlist/updaterecord/:id" component={OrgUpdateForm} />
          <PrivateRoute exact path="/ad/organizationlist/accountlist" component={OrgAccountList} />
          <PrivateRoute exact path="/ad/organizationlist/accountlist/registerorg" component={OrgAccountListAddForm} />
          <PrivateRoute exact path="/ad/requestedactivities" component={RequestedActivitesAdmin} />
          <PrivateRoute exact path="/ad/filesandreports" component={FilesAndReports} />
          <PrivateRoute exact path="/ad/idreplacement" component={IDReplacement} />
          <PrivateRoute exact path="/ad/idreplacement/addidreplacement" component={IDReplacementAddForm} />
          <PrivateRoute exact path="/ad/idreplacement/updateidreplacement/:id" component={IDReplacementUpdateForm} />
          <PrivateRoute exact path="/ad/calendar/:id" component={AdminEventSingle} />
          <PrivateRoute exact path="/ad/calendar/listOfEvents/:dateDate" component={AdminEvents} />
          <PrivateRoute exact path="/ad/filesandreports/viewArchivedReports" component={ViewOrgReports} />
          <PrivateRoute exact path="/ad/filesandreports/shareFiles" component={ShareFiles} />


        </Switch>

      </Router>

    </Provider>
  );
}

export default App;
