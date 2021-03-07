import React from 'react';
import './Header.css';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import {Container, Dropdown, Image, Menu, Segment} from "semantic-ui-react";
import logo from '../../assets/logo.png';
import {withRouter} from "react-router";

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLink: window.location.href.split('/').pop()
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({activeItem: name});
    const { history } = this.props;
    if(name=="CREATE ORDER"){
      this.props.history.push('/createOrder', {
      });
      window.location.reload();
    }
    else if(name=="ALL ORDERS"){
      this.props.history.push('/orders?type=all', {
      });
      window.location.reload();
    }
    else if(name=="PENDING ORDERS"){
      this.props.history.push('/orders?type=pendingOrders', {
      });
      window.location.reload();
    }
    else if(name=="SERVICES"){
      this.props.history.push('/services', {
      });
      window.location.reload();
    }
  }

  render() {
    const { pageLink } = this.state;
    const { activeItem } = this.state
    return (
        <Menu fixed='top' inverted stackable pointing>
            <Menu.Item as='a' header>
              <Image size='mini' src={logo}/>
              RADIAN ERGO
            </Menu.Item>
            <Menu.Item as='a'>Home</Menu.Item>
        </Menu>
    );
  }
}
export default withRouter(HeaderComponent);