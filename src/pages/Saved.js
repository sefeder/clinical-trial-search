import React, { Component } from 'react';
import Result from "../components/Result/"

class Saved extends Component {
    constructor() {
        super();
        this.state = {
            savedTrials: []
        };
    }

    componentDidMount() {
        this.setState({ savedTrials: this.props.savedTrials })
    }

    saveTrial = event => {
        // event.preventDefault();
        console.log(JSON.parse(event.target.parentElement.getAttribute('info')))
        this.setState({ savedTrials: [...this.state.savedTrials, JSON.parse(event.target.parentElement.getAttribute('info'))] },
        this.props.updateAppSavedTrials(this.state.savedTrials))
    }

    removeTrial = event => {
        // event.preventDefault();
        let result = JSON.parse(event.target.parentElement.getAttribute('info'))
        let newSavedTrials = this.state.savedTrials.filter(el => el.id !== result.id)
        this.setState({ savedTrials: newSavedTrials },
        this.props.updateAppSavedTrials(this.state.savedTrials))

    }

    render() {
        return (
            <div className="App">
                <h1>Tempus Clinical Trials Search App</h1>  
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2>Saved Trials</h2>
                    </div>
                    <div className="panel-body">
                        { this.state.savedTrials.length > 0 ? (
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

export default Saved;