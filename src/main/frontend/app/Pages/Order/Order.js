import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import {Container, Segment} from "semantic-ui-react";

import { Input, Menu } from 'semantic-ui-react'


const refreshPage = ()=>{
    window.location.reload();
}


class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showTable: true
        };
    }

    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const param = params.get('type');
        document.title = 'Orders';
        fetch('/getOrders?type='+param, {
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
            this.props.history.push('/orders?type=servicePending', {
            });
            window.location.reload();
        }
    }
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

                    </div>
            </Container>
        )
    }
}


export default OrderPage;