import React from 'react';
import Spinner from 'react-bootstrap';
import './Loader.css';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    );
  }
}

Loader.propTypes = {};
Loader.defaultProps = {};
