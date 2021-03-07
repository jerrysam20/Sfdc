import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import {Container, Dimmer, Loader, Segment} from "semantic-ui-react";
import HeaderComponent from "../../Components/Header/Header";
import CustomMenu from "../Menu/menu";


const refreshPage = ()=>{
    window.location.reload();
}


class OrderPage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            data: [],
            showTable: true,
            loaderActive:true
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
                                { title: 'NAME', field: 'name' },
                                { title: 'MOBILE NO', field: 'mobileNumber' },
                                { title: 'LOCATION', field: 'location' },
                                { title: 'AMOUNT', field: 'formattedAmount', type: 'numeric' },
                                { title: 'ORDER DATE', field: 'orderDate', type: 'numeric' },
                                { title: 'ORDER STATUS', field: 'orderStatus' }
                            ]}
                           data={this.state.data}
                            title="Orders"
                            // other props
                            options={{
                                exportButton: true
                            }}
                            detailPanel={rowData => {
                                this.props.history.push('/orderDetails?orderNo='+rowData.id, {
                                });
                            }}

                        />
                        </Segment>
            </Container>
        )
    }
}


export default OrderPage;