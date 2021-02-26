import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import {Container, Segment} from "semantic-ui-react";

class OrderPage extends Component {
    render() {
        return (
            <Container>
                    <div style={{ maxWidth: '100%',marginTop:'80px',marginBottom:'80px' }}>
                        <MaterialTable
                            columns={[
                                { title: 'Name', field: 'name' },
                                { title: 'SurName', field: 'surname' },
                                { title: 'DOB', field: 'birthYear', type: 'numeric' },
                                { title: 'City', field: 'birthCity', lookup: { 34: 'Chennai', 63: 'Mumbai' } }
                            ]}
                            data={[{ name: 'Jerry', surname: 'Sam', birthYear: 1991, birthCity: 63 },{ name: 'Anu', surname: 'Mathew', birthYear: 1987, birthCity: 34 },{ name: 'Vishnu', surname: 'prasad', birthYear: 1987, birthCity: 63 }]}
                            title="Demo Title"
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
                                selection: true,
                                exportButton: true
                            }}
                            detailPanel={rowData => {
                                return (
                                    <iframe
                                        width="100%"
                                        height="315"
                                        src="https://www.youtube.com/embed/C0DPdy98e4c"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                    />
                                )
                            }}
                            onRowClick={(event, rowData, togglePanel) => togglePanel()}
                        />
                    </div>
            </Container>
        )
    }
}


export default OrderPage;