/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import './App.css';
import HomePage from './Pages/Home/Home';
import OrderPage from './Pages/Order/Order';
import ServicePage from './Pages/Order/ServiceOrder';
import OrderDetailPage from './Pages/Order/OrderDetails';
import CreateOrderPage from './Pages/Order/CreateOrder';
import CustomMenu from './Pages/Menu/menu'
import ErrorPage from './Pages/Error/Error';
//import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './Components/Header/Header';
import FooterComponent from './Components/Footer/Footer';
import DocumentationPage from './Pages/Documentation/Documentation';
import img1 from './assets/bg.jpg'
import LoginForm from "./Pages/Login/Login";
import {Segment} from "semantic-ui-react";

function App() {
  const footerOptions = [
    {
      label: 'Site Map',
      url: ''
    },
    {
      label: 'Contact Us',
      url: ''
    },
    {
      label: 'Terms and Conditions',
      url: ''
    },
    {
      label: 'Privacy Policy',
      url: ''
    }
  ];
  return (
    <div className="appBody" style={{backgroundImage: "url(" + img1 + ")"}}>
      <Segment style={{overflow: 'auto', maxHeight: 1000 }}>
        <HeaderComponent/>
      <CustomMenu/>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/orders" component={OrderPage} />
          <Route exact path="/services" component={ServicePage} />
          <Route exact path="/orderDetails" component={OrderDetailPage} />
          <Route exact path="/createOrder" component={CreateOrderPage} />
          <Route exact path="/documentation" component={DocumentationPage} />
          <Route path="/error" component={ErrorPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
      <FooterComponent footerOptions={footerOptions} />
      </Segment>
    </div>

  );
}

export default App;
