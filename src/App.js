import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Saved from "./pages/Saved"

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      savedTrials: []
    };
  }

  updateResults = newResults => {
    this.setState({results: newResults})
  }
  updateSavedTrials = newSavedTrials => {
    this.setState({savedTrials: newSavedTrials})
  }

  render(){
    return(
      <Router>
        <div>
          <Navbar />
          <Wrapper>
            <Route exact path="/" render={(props) => (<Home updateAppResults={this.updateResults} updateAppSavedTrials={this.updateSavedTrials} results={this.state.results}  {...props} />)} />
            <Route exact path="/saved" render={(props) => (<Saved updateAppSavedTrials={this.updateSavedTrials} savedTrials={this.state.savedTrials}  {...props} />)} />
          </Wrapper>
          <Footer />
        </div>
      </Router>
    )
  }
}
export default App;
