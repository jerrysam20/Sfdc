import React from 'react';
import './Home.css';


import sfdcIcon from '../../assets/sfdc1.jpeg';

import { Jumbotron, Button, Card } from 'react-bootstrap';

const HomePage = () => (
    <div className="body-container">
        <div className="process-container row">
            <div className="components col-sm-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Header as="h5">
                        <img className="header-image" />
                    </Card.Header>
                    <Card.Img variant="top" className="card-image" src={sfdcIcon} />
                    <Card.Body>
                        <Card.Title>Triggers</Card.Title>
                        <Button variant="secondary" block>Go</Button>
                    </Card.Body>
                </Card>
            </div>
            <div className="components col-sm-offset-1 col-sm-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Header as="h5">
                        <img className="header-image" />
                    </Card.Header>
                    <Card.Img variant="top" className="card-image" src={sfdcIcon} />
                    <Card.Body>
                        <Card.Title>Integration Callouts</Card.Title>

                        <Button variant="secondary" block>Go</Button>
                    </Card.Body>
                </Card>
            </div>
            <div className="components col-sm-offset-1 col-sm-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Header as="h5">
                        <img className="header-image" />
                    </Card.Header>
                    <Card.Img variant="top" className="card-image" src={sfdcIcon} />
                    <Card.Body>
                        <Card.Title>Workflows</Card.Title>
                        <Button variant="secondary" block onClick={() => {
                            window.location.href = '/generateCode';
                        }}>Go</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>

        <div className="process-container row">
            <div className="components col-sm-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Header as="h5">
                        <img className="header-image" />
                    </Card.Header>
                    <Card.Img variant="top" className="card-image" src={sfdcIcon} />
                    <Card.Body>
                        <Card.Title>Approval Process</Card.Title>
                        <Button variant="secondary" block>Go</Button>
                    </Card.Body>
                </Card>
            </div>
            <div className="components col-sm-offset-1 col-sm-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Header as="h5">
                        <img className="header-image" />
                    </Card.Header>
                    <Card.Img variant="top" className="card-image" src={sfdcIcon} />
                    <Card.Body>
                        <Card.Title>Batch Class</Card.Title>
                        <Button variant="secondary" block>Go</Button>
                    </Card.Body>
                </Card>
            </div>
            <div className="components col-sm-offset-1 col-sm-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Header as="h5">
                        <img className="header-image"  />
                    </Card.Header>
                    <Card.Img variant="top" className="card-image" src={sfdcIcon} />
                    <Card.Body>
                        <Card.Title>Objects</Card.Title>
                        <Button type="submit" variant="secondary" block>Go</Button>
                    </Card.Body>
                </Card>
            </div>


        </div>
        <div className="process-container row">
            <div className="components col-sm-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Header as="h5">
                        <img className="header-image" />
                    </Card.Header>
                    <Card.Img variant="top" className="card-image" src={sfdcIcon} />
                    <Card.Body>
                        <Card.Title>Exception Handling</Card.Title>
                        <Button variant="secondary" block>Go</Button>
                    </Card.Body>
                </Card>
            </div>
            <div className="components col-sm-offset-1 col-sm-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Header as="h5">
                        <img className="header-image"  />
                    </Card.Header>
                    <Card.Img variant="top" className="card-image" src={sfdcIcon} />
                    <Card.Body>
                        <Card.Title>Field Updates</Card.Title>
                        <Button variant="secondary" block>Go</Button>
                    </Card.Body>
                </Card>
            </div>

        </div>
    </div>
);

export default HomePage;
