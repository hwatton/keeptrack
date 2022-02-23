import React from 'react';
import ProjectsPage from './projects/ProjectsPage';
import {
  BrowserRouter as Router, Route, NavLink, Routes
} from 'react-router-dom'
/** above! Switch is now deprecated! swapped in <Routes/>. 
 * docs suggest minimal fixes required, 
 * just element itsef can be passed and path can be '/' 
 * without need of "exact" + a few bits about nesting them in the jsx*/

import HomePage from './home/HomePage'
import './App.css';

function App() {
  return (
    <Router>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects/" className="button rounded">
          Projects
        </NavLink>
      </header>
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/projects" element={<ProjectsPage/>}/>
      </Routes>
    </div>
    </Router>
  )
}

export default App;
