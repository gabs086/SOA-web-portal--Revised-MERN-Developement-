import React from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

//Components
import Index from './components/Index';
import StudentIndex from './components/st/StudentIndex';
import OrgIndex from './components/org/OrgIndex';
import HeadIndex from './components/h/HeadIndex';
import AdminIndex from './components/ad/AdminIndex';
import { Switch } from '@material-ui/core';


function App() {
  return (
    <Router>

      <Route exact path="/" component={StudentIndex}></Route>
      <Route exact path="/org" component={OrgIndex}></Route>
      <Route exact path="/h" component={HeadIndex}></Route>
      <Route exact path="/ad" component={AdminIndex}></Route>

    </Router>

  );
}

export default App;
