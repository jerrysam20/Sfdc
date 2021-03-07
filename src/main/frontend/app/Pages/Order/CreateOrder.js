import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import {
    Button,
    Container,
    Grid,
    Label,
    List,
    Segment
} from "semantic-ui-react";

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
            showTable: true,
            deliveryDate:null,
            totalAmount:0,
            advanceAmount:0,
            paymentMode:null,
            orderStatus:null,
            name:null,
            mobileNumber:null,
            emailId:null,
            location:null,
            billingAddress:null,
            deliveryAddress:null,
            orderId:null

        };
    }



    handleSubmit=(e) => {

        let request={
            "emailId":this.state.emailId,
            "mobileNumber":this.state.mobileNumber,
            "deliveryAddress":this.state.deliveryAddress,
            "billingAddress":this.state.billingAddress,
            "name":this.state.name,
            "location":this.state.location,
            "amount":this.state.amount,
            "amountPaid":this.state.amountPaid,
            "paymentMode":this.state.paymentMode,
            "orderStatus":this.state.orderStatus,
            "productList":null
        };

        fetch('/createOrder', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(res => res.json())
            .then(
                result => {

                    this.setState({
                        orderId: result
                    });
                    if(this.state.orderId){
                        this.props.history.push('/orderDetails?orderNo='+this.state.orderId, {
                        });
                    }
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
                <Form
                    ref="form"
                    onSubmit={this.handleSubmit}>
                <Segment>Create Order</Segment>
                <Segment>
                    <Grid container columns={2} divided relaxed stackable>
                        <Grid.Column>
                            <Segment color='red'>
                                <List divided selection>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>DELIVERY DATE  :</span>
                                        <Input
                                            id='form-input-delivery-date'
                                            type="text"
                                            placeholder="Enter Delivery Date"
                                            onChange={(e)=>{this.setState({deliveryDate:e.target.value})}}
                                            value={this.state.deliveryDate}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            width={6}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>TOTAL AMOUNT  :</span>
                                        <Input
                                            type="text"
                                            placeholder="Enter Total Amount"
                                            onChange={(e)=>{this.setState({totalAmount:e.target.value})}}
                                            value={this.state.totalAmount}
                                            validators={['required','isNumber']}
                                            errorMessages={['this field is required','Enter numeric characters']}
                                            width={6}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>ADVANCE AMOUNT  :</span>
                                        <Input
                                            type="text"
                                            placeholder="Enter Advance Amount"
                                            onChange={(e)=>{this.setState({advanceAmount:e.target.value})}}
                                            value={this.state.advanceAmount}
                                            validators={['required','isNumber']}
                                            errorMessages={['this field is required','Enter numeric characters']}
                                            width={6}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>PAYMENT MODE  :</span>
                                        <Input
                                            type="text"
                                            placeholder="Enter Payment Mode"
                                            onChange={(e)=>{this.setState({paymentMode:e.target.value})}}
                                            value={this.state.paymentMode}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            width={6}
                                        />
                                    </List.Item>
                                </List>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment color='red'>
                                <List divided selection>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>NAME  :</span>
                                        <Input
                                            type="text"
                                            placeholder="Enter Name"
                                            onChange={(e)=>{this.setState({name:e.target.value})}}
                                            value={this.state.name}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            width={6}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>MOBILE NO  :</span>
                                        <Input
                                            type="text"
                                            placeholder="Enter Mobile No"
                                            onChange={(e)=>{this.setState({mobileNumber:e.target.value})}}
                                            value={this.state.mobileNumber}
                                            validators={['required','isNumber']}
                                            errorMessages={['this field is required','Enter numeric characters']}
                                            width={6}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>EMAIL ID  :</span>
                                        <Input
                                            type="text"
                                            placeholder="Enter Email Id"
                                            onChange={(e)=>{this.setState({emailId:e.target.value})}}
                                            value={this.state.emailId}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            width={6}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <span style={{ width: '30%'}} horizontal>LOCATION  :</span>
                                        <Input
                                            type="text"
                                            placeholder="Enter Location"
                                            onChange={(e)=>{this.setState({location:e.target.value})}}
                                            value={this.state.location}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            width={6}
                                        />
                                    </List.Item>
                                    <List.Item>
                                            <span style={{ width: '30%'}} horizontal>BILLING ADDRESS  : </span>
                                        <TextArea
                                            placeholder="Billing Address"
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            value={this.state.billingAddress}
                                            onChange={e=>{this.setState({billingAddress:e.target.value})}}
                                        />
                                    </List.Item>
                                    <List.Item>
                                            <span style={{ width: '30%'}} horizontal>DELIVERY ADDRESS  : </span>
                                        <TextArea
                                            placeholder="Delivery Address"
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            value={this.state.deliveryAddress}
                                            onChange={e=>{this.setState({deliveryAddress:e.target.value})}}
                                        />
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
                            <Button color="teal">Create</Button>
                        </Grid.Column>
                    </Grid>

                </Segment>
                </Form>
            </Container>
        )
    }
}


export default CreateOrder;