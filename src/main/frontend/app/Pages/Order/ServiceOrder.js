import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import {Container, Dimmer, Loader, Segment} from "semantic-ui-react";

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
            showTable: true,
            newData:null,
            orderId:null,
            loaderActive:true
        };
    }

    handleSubmit=(e) => {
        this.setState({
            loaderActive: true
        });
       let request=this.state.newData;

        fetch('/createService', {
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
                        showTable: true,
                        loaderActive: false
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
                <Dimmer
                    active = {this.state.loaderActive}
                    page={true}>
                    <Loader />
                </Dimmer>
                <CustomMenu/>
                <Segment color='red'>
                        <MaterialTable
                            columns={[
                                { title: 'DATE', field: 'date' },
                                { title: 'NAME', field: 'name' },
                                { title: 'MOB', field: 'mobileNumber',type: 'numeric'  },
                                { title: 'LOCATION', field: 'location'},
                                { title: 'DESCRIPTION', field: 'description'},
                                { title: 'STATUS', field: 'serviceStatus' },
                                { title: 'SOURCE', field: 'source' },
                                { title: 'AMOUNT', field: 'amount' }
                            ]}
                            data={this.state.data}
                            title="Orders"
                            editable={{
                                onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            this.state.newData=newData;
                                            this.handleSubmit();
                                            resolve();
                                        }, 1000);
                                    }),

                            }}
                            // other props
                            options={{
                                exportButton: true
                            }}

                        />
                    </Segment>
            </Container>
        )
    }
}


export default ServiceOrder;