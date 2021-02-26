import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import {Container, Segment} from "semantic-ui-react";

import { Input, Menu } from 'semantic-ui-react'


class OrderPage extends Component {
    state = { activeItem: 'home' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        const { activeItem } = this.state
        return (
            <Container>
                    <div style={{ maxWidth: '100%',marginTop:'80px',marginBottom:'80px' }}>
                        <Menu pointing>
                            <Menu.Item
                                name='Pending'
                                active={activeItem === 'Pending'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Completed'
                                active={activeItem === 'Completed'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Delivered'
                                active={activeItem === 'Delivered'}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                        <Segment>
                        <MaterialTable
                            columns={[
                                { title: 'Name', field: 'name' },
                                { title: 'Location', field: 'location' },
                                { title: 'Model', field: 'model' },
                                { title: 'Amount', field: 'amount', type: 'numeric' },
                                { title: 'Status', field: 'status', lookup: { 1: 'Pending', 2: 'Completed', 3:"Delivered" } }
                            ]}
                            data={[{ name: 'Jerry', location: 'Sarjapur',model: 'HB', amount: 5000, status: 1 },{ name: 'Anu', location: 'Sarjapur',model: 'LB', amount: 4000, status: 2 },{ name: 'Jijo', location: 'KR Puram',model: 'HB', amount: 5000, status: 3 },{ name: 'Justin', location: 'TC Palya',model: 'HB', amount: 7000, status: 3 }]}
                            title="Orders"
                            editable={{
                                isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
                                isEditHidden: rowData => rowData.name === 'x',
                                isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
                                isDeleteHidden: rowData => rowData.name === 'y',
                                onBulkUpdate: changes =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            /* setData([...data, newData]); */

                                            resolve();
                                        }, 1000);
                                    }),
                                onRowAddCancelled: rowData => console.log('Row adding cancelled'),
                                onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
                                onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            /* setData([...data, newData]); */

                                            resolve();
                                        }, 1000);
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const dataUpdate = [...data];
                                            const index = oldData.tableData.id;
                                            dataUpdate[index] = newData;
                                            setData([...dataUpdate]);

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
                            // other props
                            options={{
                                exportButton: true
                            }}

                        />
                        </Segment>

                    </div>
            </Container>
        )
    }
}


export default OrderPage;