import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import {Container, Grid, Header, List, Segment} from "semantic-ui-react";

export default class FooterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='About' />
                  <List link inverted>
                    <List.Item as='a'>Sitemap</List.Item>
                    <List.Item as='a'>Contact Us</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>
                    Radian Ergo
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
    );
  }
}

FooterComponent.propTypes = {
  footerOptions: PropTypes.arrayOf(PropTypes.object)
};
FooterComponent.defaultProps = {
  footerOptions: []
};
