import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";

const App = () => (
    
      <Router>
        <div>
            <Route exact path="/" component={Home} />
        </div>
      </Router>
    )
  

export default App;
