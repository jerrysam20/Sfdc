import React from 'react';
import './Home.css';
import '../../css/demo.css';
import '../../css/style.css';
import '../../css/animate-custom.css';

import reportIcon from '../../assets/report.svg';
import processIcon from '../../assets/process.svg';
import oneIcon from '../../assets/one.svg';
import twoIcon from '../../assets/two.svg';
import threeIcon from '../../assets/three.svg';
import uploadIcon from '../../assets/upload-icon.svg';

import { Jumbotron, Button, Card } from 'react-bootstrap';

const HomePage = () => (
    <div className="body-container">
        <div className="process-container row">
            <div className="components col-sm-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Header as="h5">
                        <img className="header-image" src={oneIcon} />
                    </Card.Header>
                    <Card.Img variant="top" className="card-image" src={uploadIcon} />
                    <Card.Body>
                        <Card.Title>Triggers</Card.Title>
                        <Button variant="secondary" block>Go</Button>
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
                        <Card.Title>Integration Callouts</Card.Title>

                        <Button variant="secondary" block>Go</Button>
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
                        <Card.Title>Workflows</Card.Title>
                        <Button variant="secondary" block>Go</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>

        <div className="process-container row">
            <div className="components col-sm-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Header as="h5">
                        <img className="header-image" src={oneIcon} />
                    </Card.Header>
                    <Card.Img variant="top" className="card-image" src={uploadIcon} />
                    <Card.Body>
                        <Card.Title>Approval Process</Card.Title>
                        <Button variant="secondary" block>Go</Button>
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
                        <Card.Title>Batch Class</Card.Title>
                        <Button variant="secondary" block>Go</Button>
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
                        <Card.Title>Objects</Card.Title>
                        <Button type="submit" variant="secondary" block>Go</Button>
                    </Card.Body>
                </Card>
            </div>

            
        </div>
    </div>
);

export default HomePage;
