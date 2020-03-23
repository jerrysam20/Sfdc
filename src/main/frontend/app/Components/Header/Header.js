import React from 'react';
import './Header.css';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLink: window.location.href.split('/').pop()
    };
  }

  render() {
    const { pageLink } = this.state;
    return (
      <div className="header">
        <Navbar bg="dark" variant="dark">
          <Row>
            <Col sm={1}>
              <Navbar.Brand href="/">
                {/* <span className="deloitte">Deloitte</span>
                <span className="deloitte-dot" /> */}
                <strong className="deloitte">SFDC Point & Click</strong>
              </Navbar.Brand>
            </Col>
            <Col sm={8} />
            <Col sm={3} className="nav-buttons">
              <Nav className="mr-auto">
                <Nav.Link
                  className={`${pageLink === '' ? 'active-link' : ''}`}
                  href="/"
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  className={`${
                    pageLink === 'documentation' ? 'active-link' : ''
                  }`}
                  href="/documentation"
                >
                  Documentation
                </Nav.Link>
              </Nav>
            </Col>
          </Row>
        </Navbar>
      </div>
    );
  }
}
