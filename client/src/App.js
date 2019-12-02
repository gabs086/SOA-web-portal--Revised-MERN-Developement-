import React from 'react';
import './App.css';

//Components
import Navbar from './components/layouts/Navbar';
import Navbar2 from './components/layouts/Navbar2';

import 'materialize-css/dist/css/materialize.min.css';
function App() {
  return (
    <div className="App">
      <Navbar2 />
    </div>
  );
}

export default App;
