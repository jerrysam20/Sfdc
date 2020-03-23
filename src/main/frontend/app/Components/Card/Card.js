import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import img1 from '../../assets/jdk-logo.png';
import './Card.css';

export default class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Card style={{ width: '22rem', height: '400px' }}>
          <Card.Img
            className="card-image-holder"
            variant="top"
            src={this.props.imageUrl}
          />
          <Card.Body>
            <Card.Title>{this.props.headerText}</Card.Title>
            <Card.Text>{this.props.subtitleText}</Card.Text>
            <Button variant="dark" block onClick={this.props.onButtonClick}>
              {this.props.buttonText}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

CardComponent.propTypes = {
  imageUrl: PropTypes.string,
  buttonText: PropTypes.string,
  headerText: PropTypes.string,
  subtitleText: PropTypes.string,
  onButtonClick: PropTypes.func
};
CardComponent.defaultProps = {
  imageUrl: img1,
  buttonText: 'Scan',
  headerText: 'JDK',
  subtitleText: 'Scan hybris code',
  onButtonClick: () => {}
};
