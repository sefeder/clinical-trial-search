import React, { Component } from 'react';
import './App.css';
import API from "./utils/api";
import Result from "./components/Result/"

class App extends Component {
  constructor() {
    super();
    this.state = {
      trials: [],
      savedTrials: [],
      viewSaved: false
    };
  }

  submitSearch = event => {
    event.preventDefault();
    let topic = event.target.children[0].children[1].value;
    let perPage = event.target.children[1].children[0].children[1].value;
    API.getTrials(topic, perPage).then(res =>
      this.setState({ trials: res.items })
    )
  };

  saveTrial = event => {
    // event.preventDefault();
    console.log(JSON.parse(event.target.parentElement.getAttribute('info')))
    this.setState({ savedTrials: [...this.state.savedTrials, JSON.parse(event.target.parentElement.getAttribute('info'))] })
  }

  removeTrial = event => {
    // event.preventDefault();
    let result = JSON.parse(event.target.parentElement.getAttribute('info'))
    let newSavedTrials = this.state.savedTrials.filter(el => el.id !== result.id)
    this.setState({savedTrials: newSavedTrials})
    
  }

  viewSavedTrials = event => {
    this.setState({viewSaved: !this.state.viewSaved})
  }

  render() {
    return (
      <div className="App">
        <h1>Tempus Clinical Trials Search App</h1>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>Search</h2>
          </div>
          <div className="panel-body container">
            <form id="form" onSubmit={this.submitSearch}>
              <div className="form-group">
                <label htmlFor="topicSearch">Topic:</label>
                <input
                  className="form-control"
                  id="topicSearch"
                  type="text"
                  placeholder="eg. Cancer"
                />
              </div>
              <div className="row">
                <div className="form-group col-xs-6">
                  <label htmlFor="SYSearch">Results per page: </label>
                  <select
                    defaultValue='10'
                    className="form-control"
                  >
                    <option value='10'>10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <button 
                  className="btn btn-success col-xs-6"
                onClick={this.viewSavedTrials}
                >
                {!this.state.viewSaved ? 'View Saved Trials' : 'Back to All Search Results'}
                  </button>
              </div>
              <div className="row">
                <div className="form-group">
                  <input
                    className="btn btn-primary col-xs-offset-2 col-xs-8"
                    type="submit"
                    value="Search"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>Results</h2>
          </div>
          <div className="panel-body">
            {!this.state.viewSaved ? this.state.trials.length > 0 ? (
              this.state.trials.map((a, i) => (
                <div key={i}>
                  <Result saved={false} removeTrial={this.removeTrial} saveTrial={this.saveTrial} resultObject={a}/>
              </div>))
            ) : (
                <h2>No results to display</h2>
              ) : this.state.savedTrials.length > 0 ? (
                this.state.savedTrials.map((a, i) => (
                  <div key={i}>
                    <Result saved={true} removeTrial={this.removeTrial} saveTrial={this.saveTrial} resultObject={a} />
                  </div>))
              ) : (
                  <h2>No saved trials to display</h2>
                )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
