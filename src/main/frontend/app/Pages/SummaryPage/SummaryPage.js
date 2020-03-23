/* eslint-disable no-undef */
import React, { Component } from 'react';
import './SummaryPage.css';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { List } from 'semantic-ui-react';

class SummaryPage extends Component {
  constructor(props) {
    super(props);
    this.generatePDF = this.generatePDF.bind(this);
    this.state = {
      reportData: props.location.state.reportData
    };
  }

  handleChange = (e, { value }) => this.setState({ value });

  generatePDF(event) {
    const param = event.target.innerHTML;
    const url = `/generateReport?value='${param}`;
    fetch(url, {
      method: 'post',
      body: null
    })
      .then(res => res.blob())
      .then(
        result => {
          const fileURL = URL.createObjectURL(result);
          window.open(fileURL);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          console.log(error);
          window.location.href = '/error';
        }
      );
    event.preventDefault();
  }

  render() {
    return (
      <div className="summarypage_container">
        <h2 className="report_header">Report Summary</h2>
        <div className="chart_section">
          <ReactMinimalPieChart
            animate={false}
            animationDuration={500}
            animationEasing="ease-out"
            cx={50}
            cy={50}
            data={[
              {
                color: '#35e31a',
                title: 'Green',
                value: this.state.reportData.totalGreenCount
              },
              {
                color: '#6a070d',
                title: 'Red',
                value: this.state.reportData.totalRedCount
              }
            ]}
            label={false}
            labelPosition={50}
            lengthAngle={360}
            lineWidth={100}
            onClick={undefined}
            onMouseOut={undefined}
            onMouseOver={undefined}
            paddingAngle={0}
            radius={50}
            rounded={false}
            startAngle={0}
            style={{
              height: '200px',
              width: '50%',
              float: 'left'
            }}
            viewBoxSize={[100, 100]}
          />
          <div className="list_section">
            <pre>
              Total number of applications scanned:
              {this.state.reportData.totalApplicationCount}
            </pre>

            <div className="listSection">
              <List>
                <List.Item>
                  <span className="greenDot"></span>
                  <div className="listContent">
                    <List.Content>

                      <List.Description>No patterns detected</List.Description>
                    </List.Content>
                  </div>
                </List.Item>
                <List.Item>
                  <span className="redDot"></span>
                  <div className="listContent">
                    <List.Content>

                      <List.Description>
                        Red category patterns detected
                      </List.Description>
                    </List.Content>
                  </div>
                </List.Item>
              </List>
            </div>
          </div>
        </div>
        <div className="download_section">
          <button
            className="ui basic button file pdf"
            onClick={this.generatePDF}
          >
            PDF
          </button>
          <button
            className="ui basic button file pdf"
            onClick={this.generatePDF}
          >
            HTML
          </button>
        </div>
      </div>
    );
  }
}

export default SummaryPage;
