import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
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
    List,
    Segment,
    TextArea
} from "semantic-ui-react";

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



class CreateOrder extends Component {


    handleItemClick = (e, { name }) => {
        this.setState({activeItem: name});
        if(name=="Create Order"){
            this.props.history.push('/createOrder', {
            });
        }
        else if(name=="All Orders"){
            this.props.history.push('/orders?type=all', {
            });
            window.location.reload();
        }
        else if(name=="Pending Orders"){
            this.props.history.push('/orders?type=pendingOrders', {
            });
            window.location.reload();
        }
        else if(name=="Pending Service"){
            this.props.history.push('/services', {
            });
            window.location.reload();
        }
    }


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
                    <Menu pointing>
                        <Menu.Item
                            name='All Orders'
                            active={activeItem === 'All Orders'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Pending Orders'
                            active={activeItem === 'Pending Orders'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Pending Service'
                            active={activeItem === 'Pending Service'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Create Order'
                            active={activeItem === 'Create Order'}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                    <Segment>Create Order</Segment>
                    <Segment>
                        <Grid columns={2} container divided stackable>
                            <Grid.Column>
                                <Segment>

                                    <Grid.Row>
                                        <Grid.Column style={{ width: '30%'}}>
                                            <Label horizontal>Order#</Label>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Input placeholder='Enter Order#' />
                                        </Grid.Column>
                                    </Grid.Row>


                                    <Grid.Row>
                                        <Grid.Column style={{ width: '30%'}}>
                                            <Label horizontal>Amount</Label>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Input placeholder='Enter Amount' />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        '  <Grid.Column style={{ width: '30%'}}>
                                            <Label horizontal>Order Date</Label>
                                           </Grid.Column>
                                           <Grid.Column>
                                            <Input placeholder='Enter Order Date' />
                                          </Grid.Column>
                                    </Grid.Row>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>
                                    <List divided selection>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>Name</Label>
                                            <Input placeholder='Enter Name' />
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>Phone</Label>
                                            <Input placeholder='Enter number' />
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>email</Label>
                                            <Input placeholder='Enter email' />
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>Location</Label>
                                            <Input placeholder='Enter Location' />
                                        </List.Item>
                                        <List.Item>
                                            <Label style={{ width: '30%'}} horizontal>
                                                Delivery Address
                                            </Label>
                                            <Form>
                                                <TextArea placeholder='Enter Delivery Address' />
                                            </Form>
                                        </List.Item>

                                    </List>
                                </Segment>
                            </Grid.Column>
                        </Grid>


                    </Segment>
                    <Segment>
                        <MaterialTable
                            columns={[
                                { title: 'NAME', field: 'name' },
                                { title: 'MOBILE NO', field: 'mobileNumber' },
                                { title: 'LOCATION', field: 'location' },
                                { title: 'AMOUNT', field: 'amount', type: 'numeric' },
                                { title: 'ORDER DATE', field: 'orderDate', type: 'numeric' },
                                { title: 'ORDER STATUS', field: 'orderStatus' }
                            ]}
                            data={this.state.data}
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

                                    <Button primary floated='right'>Create</Button>

                            </Grid.Column>
                        </Grid>

                    </Segment>




                </div>
            </Container>
        )
    }
}


export default CreateOrder;