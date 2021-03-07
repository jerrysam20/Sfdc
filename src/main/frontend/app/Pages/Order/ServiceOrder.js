import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import {Container, Segment} from "semantic-ui-react";

import { Input, Menu } from 'semantic-ui-react'
import CustomMenu from "../Menu/menu";


const refreshPage = ()=>{
    window.location.reload();
}


class ServiceOrder extends Component {
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
        fetch('/getServiceOrders?type='+param, {
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

    render() {
        const { activeItem } = this.state
        return (
            <Container>
                <CustomMenu/>
                <Segment color='red'>
                        <MaterialTable
                            columns={[
                                { title: 'DATE', field: 'date' },
                                { title: 'NAME', field: 'name' },
                                { title: 'MOB', field: 'mobileNumber',type: 'numeric'  },
                                { title: 'LOCATION', field: 'location'},
                                { title: 'DESCRIPTION', field: 'description'},
                                { title: 'STATUS', field: 'pending' },
                                { title: 'SOURCE', field: 'Internal' },
                                { title: 'AMOUNT', field: 'amount' }
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
            </Container>
        )
    }
}


export default ServiceOrder;