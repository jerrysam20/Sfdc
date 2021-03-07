import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import {Button, Container, Divider, Dropdown, Grid, Header, Image, Label, List, Segment} from "semantic-ui-react";

import { Input, Menu } from 'semantic-ui-react'
const orderStatusOptions = [
    {
        key: 'PENDING',
        text: 'PENDING',
        value: 'PENDING',
    },
    {
        key: 'COMPLETE',
        text: 'COMPLETE',
        value: 'COMPLETE'
    }
]
const serviceStatusOptions = [
    {
        key: 'NA',
        text: 'NA',
        value: 'NA',
    },
    {
        key: 'PENDING',
        text: 'PENDING',
        value: 'PENDING',
    },
    {
        key: 'COMPLETE',
        text: 'COMPLETE',
        value: 'COMPLETE'
    }
]



class OrderDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showTable: true
        };
    }

    componentWillMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const param = params.get('orderNo');
        document.title = 'Orders';
        fetch('/getOrder?orderId='+param, {
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
                                            <Label  style={{ width: '30%'}} horizontal>ORDER# </Label>
                                            <span style={{ color: 'green'}}>{this.state.data.id}</span>
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}}  horizontal>ORDER DATE</Label>
                                            <span style={{ color: 'green'}}>{this.state.data.orderDate}</span>
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>DELIVERY DATE</Label>
                                            <span style={{ color: 'green'}}>{this.state.data.orderDate}</span>
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>TOTAL AMOUNT</Label>
                                            <span style={{ color: 'green'}}>{this.state.data.amount}</span>
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>ADVANCE AMOUNT</Label>
                                            <span style={{ color: 'green'}}>{this.state.data.amountPaid}</span>
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>BALANCE AMOUNT</Label>
                                            <span style={{ color: 'green'}}>{this.state.data.balanceAmount}</span>
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>PAYMENT MODE</Label>
                                            <span style={{ color: 'green'}}>{this.state.data.paymentMode}</span>
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>ORDER STATUS</Label>
                                            <span style={{ color: 'green'}}>{this.state.data.orderStatus}</span>
                                        </List.Item>
                                    </List>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>
                                    <List divided selection>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>NAME</Label>
                                            <span style={{ color: 'green'}}>{this.state.data.name}</span>
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>MOBILE NO</Label>
                                            <span style={{ color: 'green'}}>{this.state.data.mobileNumber}</span>
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>EMAIL ID</Label>
                                            <span style={{ color: 'green'}}>{this.state.data.emailId}</span>
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>LOCATION</Label>
                                            <span style={{ color: 'green'}}>{this.state.data.location}</span>
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>
                                                BILLING ADDRESS
                                            </Label>
                                            <span style={{ color: 'green'}}>{this.state.data.billingAddress}</span>
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>
                                                DELIVERY ADDRESS
                                            </Label>
                                            <span style={{ color: 'green'}}>{this.state.data.deliveryAddress}</span>
                                        </List.Item>

                                    </List>
                                </Segment>
                            </Grid.Column>
                        </Grid>


                    </Segment>
                    <Segment>
                        <MaterialTable
                            columns={[
                                { title: 'PRODUCT', field: 'productName' },
                                { title: 'DESCRIPTION', field: 'description' },
                                { title: 'QTY', field: 'quantity' },
                                { title: 'AMOUNT', field: 'amount', type: 'numeric' },
                                { title: 'TOTAL', field: 'total', type: 'numeric' }
                            ]}
                            data={this.state.data.productList}
                            title="Orders"
                            editable={{
                                isDeletable: rowData => rowData.name === rowData.name, // only name(b) rows would be deletable,
                                isDeleteHidden: rowData => rowData.name === 'y',
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const dataDelete = [...data];
                                            const index = oldData.tableData.id;
                                            dataDelete.splice(index, 1);
                                            setData([...dataDelete]);

                                            resolve();
                                        }, 1000);
                                    })
                            }}
                            // other props
                            options={{
                                exportButton: true
                            }}
                            detailPanel={rowData => {
                                this.props.history.push('/orderDetails', {
                                });
                            }}

                        />
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
                                                placeholder='Select Order Status'
                                                fluid
                                                selection
                                                options={orderStatusOptions}
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
                                                placeholder='Select Service Status'
                                                fluid
                                                selection
                                                options={serviceStatusOptions}
                                            />
                                        </List.Item>
                                    </List>
                                </Segment>
                            </Grid.Column>
                        </Grid>



                    </Segment>


                        <Button primary floated='right'>Update</Button>


                </div>
            </Container>
        )
    }
}


export default OrderDetails;