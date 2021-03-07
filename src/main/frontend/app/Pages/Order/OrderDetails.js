import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import {Button, Container, Dimmer, Grid, Label, List, Loader, Segment} from "semantic-ui-react";

import {Form,Input,TextArea,Dropdown} from 'semantic-ui-react-form-validator'
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



class OrderDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderStatus: null,
            productList:[],
            showTable: true,
            data: [],
            orderId:null,
            loaderActive:true
        };
    }
    handleSubmit=(e) => {
        this.setState({
            loaderActive: true
        });
        let request={
            "id":this.state.orderId,
            "orderStatus":this.state.orderStatus,
            "productList":this.state.productList
        };

        fetch('/updateOrder', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(
                result => {

                    this.setState({
                        orderId: result
                    });
                    window.location.reload();
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

    componentWillMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const param = params.get('orderNo');
        this.setState({
            orderId: param
        });
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
                        showTable: true,
                        productList:result.productList,
                        loaderActive:false
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
                <Dimmer
                    active = {this.state.loaderActive}
                    page={true}>
                    <Loader />
                </Dimmer>
                <CustomMenu/>
                <Form
                    ref="form"
                    onSubmit={this.handleSubmit}>
                <Segment>Order Details</Segment>
                    <Segment>
                        <Grid container columns={2} divided relaxed stackable>
                            <Grid.Column>
                                <Segment color='red'>
                                    <List divided selection>
                                        <List.Item>
                                            <span  style={{ width: '30%'}} >ORDER#  : </span>
                                            <span style={{ color: 'black'}}>{this.state.data.id}</span>
                                        </List.Item>
                                        <List.Item>
                                            <span style={{ width: '30%'}}  >ORDER DATE  :</span>
                                            <span style={{ color: 'black'}}>{this.state.data.orderDate}</span>
                                        </List.Item>
                                        <List.Item>
                                            <span style={{ width: '30%'}} horizontal>DELIVERY DATE  :</span>
                                            <span style={{ color: 'black'}}>{this.state.data.orderDate}</span>
                                        </List.Item>
                                        <List.Item>
                                            <span style={{ width: '30%'}} horizontal>TOTAL AMOUNT  :</span>
                                            <span style={{ color: 'black'}}>{this.state.data.amount}</span>
                                        </List.Item>
                                        <List.Item>
                                            <span style={{ width: '30%'}} horizontal>ADVANCE AMOUNT  :</span>
                                            <span style={{ color: 'black'}}>{this.state.data.amountPaid}</span>
                                        </List.Item>
                                        <List.Item>
                                            <span style={{ width: '30%'}} horizontal>BALANCE AMOUNT  :</span>
                                            <span style={{ color: 'black'}}>{this.state.data.balanceAmount}</span>
                                        </List.Item>
                                        <List.Item>
                                            <span style={{ width: '30%'}} horizontal>PAYMENT MODE  :</span>
                                            <span style={{ color: 'black'}}>{this.state.data.paymentMode}</span>
                                        </List.Item>
                                        <List.Item>
                                            <span style={{ width: '30%'}} horizontal>ORDER STATUS  :</span>
                                            <span style={{ color: 'black'}}>{this.state.data.orderStatus}</span>
                                        </List.Item>
                                    </List>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment color='red'>
                                    <List divided selection>
                                        <List.Item>
                                            <span style={{ width: '30%'}} horizontal>NAME  :</span>
                                            <span style={{ color: 'black'}}>{this.state.data.name}</span>
                                        </List.Item>
                                        <List.Item>
                                            <span style={{ width: '30%'}} horizontal>MOBILE NO  :</span>
                                            <span style={{ color: 'black'}}>{this.state.data.mobileNumber}</span>
                                        </List.Item>
                                        <List.Item>
                                            <span style={{ width: '30%'}} horizontal>EMAIL ID  :</span>
                                            <span style={{ color: 'black'}}>{this.state.data.emailId}</span>
                                        </List.Item>
                                        <List.Item>
                                            <span style={{ width: '30%'}} horizontal>LOCATION  :</span>
                                            <span style={{ color: 'black'}}>{this.state.data.location}</span>
                                        </List.Item>
                                        <List.Item>
                                            <span style={{ width: '30%'}} horizontal>
                                                BILLING ADDRESS  :
                                            </span>
                                            <span style={{ color: 'black'}}>{this.state.data.billingAddress}</span>
                                        </List.Item>
                                        <List.Item>
                                            <span style={{ width: '30%'}} horizontal>
                                                DELIVERY ADDRESS  :
                                            </span>
                                            <span style={{ color: 'black'}}>{this.state.data.deliveryAddress}</span>
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
                                onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                         let entry={
                                             "productName":newData.productName,
                                             "description":newData.description,
                                             "quantity":newData.quantity,
                                             "amount":newData.amount,
                                             "total":newData.total
                                         }
                                         this.state.productList.push(entry);
                                          this.handleSubmit();
                                            resolve();
                                        }, 1000);
                                    }),

                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const dataDelete = this.state.productList;
                                            const index = oldData.tableData.id;
                                            dataDelete.splice(index, 1);
                                            this.state.productList=dataDelete;
                                            this.handleSubmit();
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
                                            <Label style={{ width: '40%'}} horizontal>
                                                Order Status
                                            </Label>
                                            <Dropdown
                                                placeholder="Enter Order Status"
                                                onChange={(e,{value})=>{this.setState({orderStatus:value})}}
                                                value={this.state.orderStatus}
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                errorMessages={['You must select one option']}
                                                options={orderStatusOptions}
                                            />
                                        </List.Item>
                                    </List>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Button color="teal">Update</Button>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Form>
            </Container>
        )
    }
}


export default OrderDetails;