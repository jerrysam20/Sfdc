import React from 'react';
import './Home.css';
import reportIcon from '../../assets/report.svg';
import processIcon from '../../assets/process.svg';
import oneIcon from '../../assets/one.svg';
import twoIcon from '../../assets/two.svg';
import threeIcon from '../../assets/three.svg';
import uploadIcon from '../../assets/upload-icon.svg';

import { Jumbotron, Button, Card } from 'react-bootstrap';

const HomePage = () => (
  <div className="body-container">
    <Jumbotron>
      <h1 className="padding-adder">Analysing vulnerabilities. Simplified.</h1>
      <h3 className="padding-adder">
        <strong>CritQ</strong> helps you scan the code and look for
        vulnerabilities within the project.
      </h3>
      <p className="padding-adder">
        <Button
          variant="dark"
          onClick={() => {
            window.location.href = '/explore';
          }}
        >
          Explore
        </Button>
      </p>
    </Jumbotron>
    <h3 className="process-title">
      Scan your code and generate a report in three simple steps.
    </h3>
    <div className="process-container row">
      <div className="components col-sm-2">
        <Card style={{ width: '18rem' }}>
          <Card.Header as="h5">
            <img className="header-image" src={oneIcon} />
          </Card.Header>
          <Card.Img variant="top" className="card-image" src={uploadIcon} />
          <Card.Body>
            <Card.Title>Upload files in .zip format</Card.Title>
            <Card.Text>
              Bundle your project into a zip file and upload it onto our portal.
              We support JDK, Hybris and Logging related features.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="components col-sm-offset-1 col-sm-2">
        <Card style={{ width: '18rem' }}>
          <Card.Header as="h5">
            <img className="header-image" src={twoIcon} />
          </Card.Header>
          <Card.Img variant="top" className="card-image" src={processIcon} />
          <Card.Body>
            <Card.Title>Process the file</Card.Title>
            <Card.Text>
              Fill in the details required as per your project specifications
              and hit scan.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="components col-sm-offset-1 col-sm-2">
        <Card style={{ width: '18rem' }}>
          <Card.Header as="h5">
            <img className="header-image" src={threeIcon} />
          </Card.Header>
          <Card.Img variant="top" className="card-image" src={reportIcon} />
          <Card.Body>
            <Card.Title>Report generated for analysis</Card.Title>
            <Card.Text>
              The tool generates a report based on the input given at the time
              of upload and processing.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>
);

export default HomePage;
