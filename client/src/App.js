import React from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

//Components
// import Navbar from './components/layouts/Navbar';
// import Navbar2 from './components/layouts/Navbar2';
// import DashboardAdmin from './components/layouts/DashboardAdmin';
import DashboardHead from './components/layouts/DashboardHead';


function App() {
  return (
    <div className="App">
      <DashboardHead />
    </div>
  );
}

export default App;
