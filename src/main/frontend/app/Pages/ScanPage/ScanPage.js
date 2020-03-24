/* eslint-disable react/sort-comp */
/* eslint-disable no-undef */
import React from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './ScanPage.css';
import SelectBox from '../../Components/Dropdown/Dropdown';

export default class ScanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: window.location.href.split('/').pop(),
      input: '',
      isLoading: false,
      selectedDate: new Date(),
      selectedFormattedDate: moment(new Date()).format('YYYYMMDD'),
      sourceOptionsData: [
        {
          label: 'Triggers',
          value: 'Triggers',
          version: 6,
          source: 'sourceOption'
        },
        {
          label: 'Integration Callouts',
          value: 'Integration Callouts',
          version: 7,
          source: 'sourceOption'
        },
        {
          label: 'Workflows',
          value: 'Workflows',
          version: 8,
          source: 'sourceOption'
        },
        {
          label: 'Approval Process',
          value: 'Approval Process',
          version: 9,
          source: 'sourceOption'
        },
        {
          label: 'Batch Class',
          value: 'Batch Class',
          version: 10,
          source: 'sourceOption'
        }
      ],
      sourceHybrisData: [
        {
          label: 'Hybris 5.5',
          value: 'hybris-5.5',
          version: 5.5,
          source: 'sourceHybrisOption'
        },
        {
          label: 'Hybris 6.2',
          value: 'hybris-6.2',
          version: 6.2,
          source: 'sourceHybrisOption'
        },
        {
          label: 'Hybris 6.7',
          value: 'hybris-6.7',
          version: 6.7,
          source: 'sourceHybrisOption'
        }
      ],
      availableHybrisData: [
        {
          label: 'items.xml',
          value: 'items.xml',
          source: 'availableHybrisOption'
        },
        {
          label: 'properties',
          value: 'properties',
          source: 'availableHybrisOption'
        },
        {
          label: 'junit',
          value: 'junit',
          source: 'availableHybrisOption'
        },
        {
          label: 'sonar',
          value: 'sonar',
          source: 'availableHybrisOption'
        }
      ],
      availableHybrisOption: '',
      sourceHybrisOption: '',
      value: '',
      selectedSourceVersion: '',
      availableOptionsData: [
        {
          label: 'Triggers',
          value: 'Triggers',
          version: 6,
          source: 'availableOption'
        },
        {
          label: 'Integration Callouts',
          value: 'Integration Callouts',
          version: 7,
          source: 'availableOption'
        },
        {
          label: 'Workflows',
          value: 'Workflows',
          version: 8,
          source: 'availableOption'
        },
        {
          label: 'Approval Process',
          value: 'Approval Process',
          version: 9,
          source: 'availableOption'
        },
        {
          label: 'Batch Class',
          value: 'Batch Class',
          version: 10,
          source: 'availableOption'
        }
      ],
      modifiedAvailableOptions: [
        {
          label: 'Objects',
          value: 'Objects',
          version: 6,
          source: 'availableOption'
        },
        {
          label: 'Exception Handling',
          value: 'Exception Handling',
          version: 7,
          source: 'availableOption'
        },
        {
          label: 'Field Updates',
          value: 'Field Updates',
          version: 8,
          source: 'availableOption'
        }
      ],
      optionId: 'JDK6-7',
      file: null,
      reportId: '',
      availableOption: '',
      sourceOption: '',
      logEnvironmentOptions: [
      ],
      environment: '',
      nodes: {
        uat: [

        ],
        itg: [

        ],
        cdev: [

        ]
      },
      selectedNode: ''
    };
  }

  handleChange = date => {
    this.setState({
      selectedDate: date,
      selectedFormattedDate: moment(date).format('YYYYMMDD')
    });
  };

  handleOptionChange = option => {
    const { source, value, version = '' } = option;
    this.setState({
      [source]: value
    });

    if (source === 'sourceOption') {
      this.setState({
        selectedSourceVersion: version,
        modifiedAvailableOptions: this.state.availableOptionsData.filter(
          item => item.version > version
        ),
        availableOption: 'Select available option'
      });
    }
    if (source === 'environment') {
      this.setState({
        selectedNode: 'Select a node'
      });
    }
  };

  onChange = (e, selectedParam) => {
    this.setState({
      [selectedParam]: e.target.value
    });
  };

  // eslint-disable-next-line react/sort-comp
  handleSubmit = event => {
    this.setState({
      isLoading: true
    });
    const formData = new FormData();
    if (this.state.mode === 'log') {
      formData.append('environment', this.state.environment);
      formData.append('node', this.state.selectedNode);
      formData.append('date', this.state.selectedFormattedDate);
      formData.append('reportId', this.state.reportId);
      formData.append('reportingType', this.state.mode);
    } else if (this.state.mode === 'hybris') {
      formData.append('file', this.state.file);
      formData.append('availableOption', this.state.availableHybrisOption);
      formData.append('sourceOption', this.state.sourceHybrisOption);
      formData.append('reportId', this.state.reportId);
      formData.append('reportingType', this.state.mode);
    } else {
      formData.append('file', this.state.file);
      formData.append('availableOption', this.state.availableOption);
      formData.append('sourceOption', this.state.sourceOption);
      formData.append('reportId', this.state.reportId);
      formData.append('reportingType', this.state.mode);
    }
    const endPoint = this.state.mode === 'log' ? '/readLogFile' : '/generateCode';
    fetch(endPoint, {
      method: 'post',
      body: formData
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
          if (this.state.mode === 'log') {
            // this.props.history.push('/summary', {
            //   reportData: result,
            //   mode: this.state.mode
            // });
          } else {
            // eslint-disable-next-line react/prop-types
            this.props.history.push('/summary', {
              reportData: result,
              mode: this.state.mode
            });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
          window.location.href = '/error';
        }
      );
    event.preventDefault();
  };

  //   onChange = e => this.setState({ file: e.target.files[0] });
  onChange1 = e => {
    this.setState({ file: e.target.files[0] });
  };

  render() {
    const { mode, environment } = this.state;

    return (
      <div className="body-container">
        <div className="scanpage-container">
          <div className="animate-form">
          <div className="section">
            <div className="scanpage-form row">
              <div className="col-xs-24">
                <h1 className="form-header">CODE GENERATION FORM</h1>
                <div className="form-group">
                  <Form>
                    {mode === 'jdk' && (
                      <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="12">
                          Select Source Type
                        </Form.Label>
                        <Col sm="12">
                          <SelectBox
                            type="dropdown"
                            options={this.state.sourceOptionsData}
                            value={this.state.sourceOption}
                            onChange={this.handleOptionChange}
                          />
                        </Col>
                      </Form.Group>
                    )}
                    {mode === 'hybris' && (
                      <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="12">
                          Select Source Type
                        </Form.Label>
                        <Col sm="12">
                          <SelectBox
                            type="dropdown"
                            options={this.state.sourceHybrisData}
                            value={this.state.availableOption}
                            onChange={this.handleOptionChange}
                          />
                        </Col>
                      </Form.Group>
                    )}
                    {mode === 'hybris' && (
                      <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="12">
                          Select Source Type
                        </Form.Label>
                        <Col sm="12">
                          <SelectBox
                            type="dropdown"
                            options={this.state.availableHybrisData}
                            value={this.state.availableHybrisOption}
                            onChange={this.handleOptionChange}
                          />
                        </Col>
                      </Form.Group>
                    )}




                    {(mode === 'hybris' || mode === 'jdk') && (
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="12">
                          Browse input file
                        </Form.Label>
                        <Col sm="12">
                          <input
                            type="file"
                            onChange={e => this.onChange1(e)}
                          ></input>
                        </Col>
                      </Form.Group>
                    )}

                  </Form>
                  <p style={{ "text-align": 'center','margin-top': '40px'}}>
                    <input className="login-button" type="submit" ></input>
                  </p>

                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {this.state.isLoading && (
          <div className="overlay">
            <Spinner animation="border" />
          </div>
        )}
      </div>
    );
  }
}

ScanPage.defaultProps = {
  match: ''
};
