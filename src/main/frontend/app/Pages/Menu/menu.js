import React, { Component } from 'react'
import logo from '../../assets/logo.png';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import ReactDOM from 'react-dom'
import {
    Button,
    Container,
    Divider,
    Dropdown,
    Form,
    Grid,
    Header,
    Image,
    Label,
    List, Menu,
    Segment,
    TextArea
} from "semantic-ui-react";

class CustomMenu extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            data: [],
            showTable: true
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
        const { activeItem } = this.state
        return (
            <Container style={{ marginTop: '6em' }}>
                    <Menu stackable pointing>
                        <Menu.Item>
                            <img src={logo} />
                        </Menu.Item>
                        <Menu.Item
                            name='ALL ORDERS'
                            active={activeItem === 'ALL ORDERS'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='PENDING ORDERS'
                            active={activeItem === 'PENDING ORDERS'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='COMPLETED ORDERS'
                            active={activeItem === 'COMPLETED ORDERS'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='SERVICES'
                            active={activeItem === 'SERVICES'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='CREATE ORDER'
                            active={activeItem === 'CREATE ORDER'}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
            </Container>
        )
    }
}


export default withRouter(CustomMenu);