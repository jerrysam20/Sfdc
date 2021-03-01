import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import {Button, Container, Divider, Dropdown, Grid, Header, Image, Label, List, Segment} from "semantic-ui-react";

import { Input, Menu } from 'semantic-ui-react'
const friendOptions = [
    {
        key: 'Jenny Hess',
        text: 'Jenny Hess',
        value: 'Jenny Hess',
        image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
    },
    {
        key: 'Elliot Fu',
        text: 'Elliot Fu',
        value: 'Elliot Fu',
        image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
    },
    {
        key: 'Stevie Feliciano',
        text: 'Stevie Feliciano',
        value: 'Stevie Feliciano',
        image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
    },
    {
        key: 'Christian',
        text: 'Christian',
        value: 'Christian',
        image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
    },
    {
        key: 'Matt',
        text: 'Matt',
        value: 'Matt',
        image: { avatar: true, src: '/images/avatar/small/matt.jpg' },
    },
    {
        key: 'Justen Kitsune',
        text: 'Justen Kitsune',
        value: 'Justen Kitsune',
        image: { avatar: true, src: '/images/avatar/small/justen.jpg' },
    },
]


class OrderDetails extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showTable: true
        };
    }

    componentDidMount() {
        document.title = 'Orders';
        fetch('/getOrders?orderType=""&serviceType=""', {
            method: 'get',
            body: null
        })
            .then(res => res.json())
            .then(
                result => {

                    this.setState({
                        data: result,
                        showTable: true
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        const { activeItem } = this.state
        return (
            <Container>
                <div style={{ maxWidth: '100%',marginTop:'80px',marginBottom:'80px' }}>
                    <Segment>Order Details</Segment>
                    <Segment>
                        <Grid container columns={2} divided relaxed stackable>
                            <Grid.Column>
                                <Segment>
                                    <List divided selection>
                                        <List.Item>
                                            <Label  style={{ width: '30%'}} horizontal>Order#</Label>
                                            Q-0001
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}}  horizontal>Amount</Label>
                                           5000
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>Order Date</Label>
                                                25-06-2021
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>Billing Address</Label>
                                            B302, Signature classic apartments, Sompura Raod, Sarjapur-562125
                                        </List.Item>
                                    </List>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>
                                    <List divided selection>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>Name</Label>
                                            Jerry Sam
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>Phone</Label>
                                            7406846418
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>email</Label>
                                           jerrysam20@gmail.com
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>Location</Label>
                                            Sarjapur
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>
                                               Delivery Address
                                            </Label>
                                            B302, Signature classic apartments, Sompura Raod, Sarjapur-562125
                                        </List.Item>

                                    </List>
                                </Segment>
                            </Grid.Column>
                        </Grid>


                    </Segment>
                    <Segment>
                        <Grid container columns={2} divided relaxed stackable>
                            <Grid.Column>
                                <Segment>
                                    <List divided selection>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>
                                                Order Status
                                            </Label>
                                            <Dropdown
                                                placeholder='Select Friend'
                                                fluid
                                                selection
                                                options={friendOptions}
                                            />
                                        </List.Item>
                                    </List>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>
                                    <List divided selection>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>
                                                Service Status
                                            </Label>
                                            <Dropdown
                                                placeholder='Select Friend'
                                                fluid
                                                selection
                                                options={friendOptions}
                                            />
                                        </List.Item>
                                    </List>
                                </Segment>
                            </Grid.Column>
                        </Grid>



                    </Segment>


                        <Button primary floated='right'>Submit</Button>


                </div>
            </Container>
        )
    }
}


export default OrderDetails;