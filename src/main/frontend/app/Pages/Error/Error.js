import React from 'react';
import './Error.css';
import errorIcon from '../../assets/error-404.svg';

import { Jumbotron, Button } from 'react-bootstrap';

const ErrorPage = () => (
  <div className="body-container">
    <Jumbotron>
      <img className="error-icon" src={errorIcon} />
      <h1>Uh, oh! Something went wrong.</h1>
      <p>
        We are working on resolving it. Meanwhile, you can redirect to home.
      </p>
      <p>
        <Button
          variant="dark"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Go to home page
        </Button>
      </p>
    </Jumbotron>
  </div>
);

export default ErrorPage;
