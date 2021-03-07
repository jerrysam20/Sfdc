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
import CustomMenu from "../Menu/menu";
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
                <CustomMenu/>

                <Segment>Create Order</Segment>
                <Segment>
                    <Grid container columns={2} divided relaxed stackable>
                        <Grid.Column>
                            <Segment color='red'>
                                <List divided selection>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>DELIVERY DATE  :</span>
                                        <Input placeholder='Enter Delivery Date' />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>TOTAL AMOUNT  :</span>
                                        <Input placeholder='Enter Total Amount' />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>ADVANCE AMOUNT  :</span>
                                        <Input placeholder='Enter Advance Amount' />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>PAYMENT MODE  :</span>
                                        <Input placeholder='Enter Payment Mode' />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>ORDER STATUS  :</span>
                                        <Input placeholder='Enter Order Status' />
                                    </List.Item>
                                </List>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment color='red'>
                                <List divided selection>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>NAME  :</span>
                                        <Input placeholder='Enter Name' />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>MOBILE NO  :</span>
                                        <Input placeholder='Enter Mobile No' />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>EMAIL ID  :</span>
                                        <Input placeholder='Enter Email Id' />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>LOCATION  :</span>
                                        <Input placeholder='Enter Location' />
                                    </List.Item>
                                    <List.Item>
                                            <span style={{ width: '30%'}} horizontal>BILLING ADDRESS  : </span>
                                        <TextArea placeholder='Enter Billing Address' />
                                    </List.Item>
                                    <List.Item>
                                            <span style={{ width: '30%'}} horizontal>DELIVERY ADDRESS  : </span>
                                        <TextArea placeholder='Enter Delivery Address' />
                                    </List.Item>

                                </List>
                            </Segment>
                        </Grid.Column>
                    </Grid>


                </Segment>
                <Segment color='red'>
                    <MaterialTable
                        columns={[
                            { title: 'PRODUCT', field: 'productName' },
                            { title: 'DESCRIPTION', field: 'description' },
                            { title: 'QTY', field: 'quantity' },
                            { title: 'AMOUNT', field: 'amount', type: 'numeric' },
                            { title: 'TOTAL', field: 'total', type: 'numeric' }
                        ]}
                        data={this.state.data.productList}
                        title="Products"
                        editable={{
                            isDeletable: rowData => rowData.name === rowData.name, // only name(b) rows would be deletable,
                            isDeleteHidden: rowData => rowData.name === 'y',
                            pagination:false,
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        /* setData([...data, newData]); */

                                        resolve();
                                    }, 1000);
                                }),

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
                        options={{
                            paging: false
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




            </Container>
        )
    }
}


export default CreateOrder;