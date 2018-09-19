import React, { Component } from 'react';
import API from "../utils/api";
import Result from "../components/Result/";
import M from 'materialize-css';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Home extends Component {
    constructor() {
        super();
        this.state = {
            trials: [],
            savedTrials: [],
            topic: null,
            fileNameInput: '',
            docDefinition: {}
        };
    };

    componentDidMount() {
        document.getElementById('searchInput').focus();
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.collapsible');
            M.Collapsible.init(elems, {});
        });
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.modal');
            M.Modal.init(elems, {});
        });
    };

    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value });
    };

    downloadPdf = () => {
        if (this.state.fileNameInput === '') {

        }
        pdfMake.createPdf(this.state.docDefinition).download(`${this.state.fileNameInput}.pdf`);
    };

    createPreview = () => {
        document.getElementById('fileNameInput').focus();

        const data = this.state.savedTrials.map((a, i) => [a.public_title, !a.interventions ? 'No interventions provided' : a.interventions.length === 0 ? 'No interventions provided' : { ul: a.interventions.map((el, i) => el.name) }, !a.locations ? 'No locations provided' : a.locations.length === 0 ? 'No locations provided' : { ul: a.locations.map((el, i) => el.name) }]);

        const dataWithHeaders = [[{ text: 'Public Title', style: 'tableHeader' }, { text: 'Interventions', style: 'tableHeader' }, { text: 'Locations', style: 'tableHeader' }]].concat(data);

        const docDefinition = {
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                tableHeader: {
                    fontSize: 14,
                    bold: true
                },
                title: {
                    fontSize: 26,
                    alignment: 'center'
                },
                im: {
                    alignment: 'center'
                }
            },
            header: {
                columns: [
                    { text: 'SearchReport Inc.', style: 'header', margin: [10, 10, 0, 0] },
                    { text: `Search Term Used: ${this.state.topic}`, style: 'header', alignment: 'right', margin: [0, 10, 10, 0] }
                ]
            },
            watermark: { text: 'SearchReport Inc.', color: 'black', opacity: 0.2, bold: true, italics: false },
            content: [
                {
                    image: 'data:image/jpeg;base64,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', width: 515, height: 110
                },
                { text: 'Search Report', style: 'title' },
                {
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        body: dataWithHeaders
                    }
                }
            ]
        };
        this.setState({docDefinition});
        pdfMake.createPdf(docDefinition).getDataUrl( outDoc => {
            document.getElementById('pdfV').src = outDoc});
    };

    submitSearch = event => {
        event.preventDefault();
        this.setState({trials: []});
        let topic = event.target.parentElement.children[0].children[0].children[0].value;
        console.log(document.querySelector('select').value);
        let perPage = document.querySelector('select').value;
        API.getTrials(topic, perPage).then(res => {
            this.setState({ trials: res.items, topic: topic, savedTrials: [] });
        });
    };

    saveTrial = event => {
        // event.preventDefault();
        console.log(JSON.parse(event.target.parentElement.getAttribute('info')));
        this.setState({ savedTrials: [...this.state.savedTrials, JSON.parse(event.target.parentElement.getAttribute('info'))] });
    };

    removeTrial = event => {
        // event.preventDefault();
        console.log(event.target.parentElement);
        let result = JSON.parse(event.target.parentElement.getAttribute('info'));
        let newSavedTrials = this.state.savedTrials.filter(el => el.id !== result.id);
        this.setState({ savedTrials: newSavedTrials });
    };

    render() {
        return (
            <div className="App container" id="main-container">
                <h1>Search Report App</h1>
                <h5 className="instructions"> Search for clinical trials, then click on each title for more information. Click the "Add to Report" button to add that trial to your saved report. When you're ready, click "Download Report" to add a name, see a preview, and download the final report.</h5>
                <div className="">
                    <div>
                        <form id="form" onSubmit={this.submitSearch}>
                            <div className="form-group">
                                <input
                                    // className="form-control"
                                    id="searchInput"
                                    type="text"
                                    placeholder="Find trial by keywords (eg. cancer)"
                                />
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    value="Search"
                                >
                                Search
                                </button>
                            </div>
                            <div className="row">
                                <div className="form-group ">
                                    <div className="input-field">
                                        <p className='white-text'>
                                        How many results to display: 
                                        </p>
                                        <select className="browser-default">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <button onClick={this.createPreview} className="btn modal-trigger" data-target="downloadModal">Download Report</button>
                    </div>
                </div>
                <div className="result-panel" >
                    <ul id='result-ul' className="collapsible resultBackground">
                        {this.state.trials.map((a, i) => (
                                <Result key={i} number={i} removeTrial={this.removeTrial} saveTrial={this.saveTrial} resultObject={a} />
                            ))
                        }
                    </ul>
                </div>

                <div className="modal modal-fixed-footer" id="downloadModal">
                        <div className="modal-content">
                           
                            <h5 className="modal-title" id="exampleModalLabel">Name Your Report{this.state.fileNameInput !== '' ? `: ${this.state.fileNameInput}.pdf` : null }</h5>
                                <form>
                                    <input onChange={this.handleInputChange}
                                        className="validate"
                                        value={this.state.fileNameInput} placeholder="eg. my_first_report" type="text" id="fileNameInput" name="fileNameInput"/>
                                </form>
                            < iframe id='pdfV' title="pdfPreview" style={{ "width": 600, 'height': 375 }} > </ iframe>
                           </div>
                            
                            <div className="modal-footer">
                           
                        <button
                            style={{marginRight: 6}} type="button" className="modal-close btn red">
                                    Close
                                </button>
                                <button type="submit" onClick={this.downloadPdf} className="btn btn-primary">Download</button>
                            </div>
                        </div>
            </div>
        )
    };
};

export default Home;