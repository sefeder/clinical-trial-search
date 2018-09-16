import React, { Component } from 'react';
import "./Result.css";

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: false,
            saved: false
        };
    }

    showMore = event => {
        event.preventDefault();
        this.setState({showMore: !this.state.showMore})
        console.log(this.props.resultObject)

    };

    submitSave = event => {
        event.preventDefault();
        this.setState({ saved: !this.state.saved })
        this.props.saveTrial(event)
    }

    submitRemove = event => {
        event.preventDefault();
        this.setState({ saved: !this.state.saved })
        this.props.removeTrial(event)

    }

    render() {
        return (
            <div className="panel panel-default" info={JSON.stringify(this.props.resultObject)}>
                <h4>{this.props.resultObject.public_title}</h4>
                {this.state.showMore ? 
                    <div className='text-left'>
                        <h4> 
                            <b>Status:</b> {this.props.resultObject.status ? this.props.resultObject.status : 'No status provided' }
                        </h4>
                        <h4> 
                            <b>Age Range:</b> {this.props.resultObject.age_range ? this.props.resultObject.age_range.min_age +' - '+ this.props.resultObject.age_range.max_age : 'No age range provided'}
                        </h4>
                        <h4>
                            <b>Target Sample Size:</b> {this.props.resultObject.target_sample_size ? this.props.resultObject.target_sample_size : 'No target sample size provided'}
                        </h4>
                        <h4> 
                            <b>Gender:</b> {this.props.resultObject.gender ? this.props.resultObject.gender : 'No gender provided' }
                        </h4>
                        <h4>
                            <b>Conditions:</b> {!this.props.resultObject.conditions ? 'No conditions provided' : this.props.resultObject.conditions.length === 0 ? 'No conditions provided' : <ul> {this.props.resultObject.conditions.map((a, i) => <li key={i}>{a.name}</li>)} </ul> }
                        </h4>
                        <h4>
                            <b>Interventions:</b> {!this.props.resultObject.interventions ? 'No interventions provided' : this.props.resultObject.interventions.length === 0 ? 'No interventions provided' : <ul> {this.props.resultObject.interventions.map((a, i) => <li key={i}>{a.name}</li>)} </ul> }
                        </h4>
                        <h4>
                            <b>Locations:</b> {!this.props.resultObject.locations ? 'No locations provided' : this.props.resultObject.locations.length === 0 ? 'No locations provided' : <ul> {this.props.resultObject.locations.map((a, i) => <li key={i}>{a.name}</li>)} </ul> }
                        </h4>
                        <h4>
                            <b>Records:</b> {!this.props.resultObject.records ? 'No records provided' : this.props.resultObject.records.length === 0 ? 'No records provided' : <ul> {this.props.resultObject.records.map((a, i) => <li key={i}><a target='_blank' href={a.source_url}>{a.source_url}</a></li>)} </ul> }
                        </h4>
                        <h4>
                            <b>Documents:</b> {!this.props.resultObject.documents ? 'No documents provided' : this.props.resultObject.documents.length === 0 ? 'No documents provided' : <ul> {this.props.resultObject.documents.map((a, i) => <li key={i}>{a.name}</li>)} </ul> }
                        </h4>
                        <h4>
                            <b>Summary:</b> {this.props.resultObject.brief_summary ? this.props.resultObject.brief_summary : 'No summary provided'}
                        </h4>
                    </div>
                    : <div></div>}
                <button
                    className="btn btn-primary"
                    onClick={this.showMore}
                >
                    {!this.state.showMore ? 'Show More' : 'Show Less'}
                  </button>
                {!this.state.saved ?
                <button
                    className="btn btn-success"
                    onClick={this.submitSave}
                >
                Save
                </button> :
                <button
                    className="btn btn-danger"
                    onClick={this.submitRemove}
                >
                    Remove from Saved
                </button>
                }
                <br />
                <br />
            </div>
        )
    }

}

export default Result;