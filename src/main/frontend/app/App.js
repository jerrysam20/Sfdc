/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import './App.css';
import HomePage from './Pages/Home/Home';
import OrderPage from './Pages/Order/Order';
import OrderDetailPage from './Pages/Order/OrderDetails';
import CreateOrderPage from './Pages/Order/CreateOrder';
import ErrorPage from './Pages/Error/Error';
//import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './Components/Header/Header';
import FooterComponent from './Components/Footer/Footer';
import DocumentationPage from './Pages/Documentation/Documentation';
import img1 from './assets/bg.jpg'
import LoginForm from "./Pages/Login/Login";

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
      <HeaderComponent/>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/orders" component={OrderPage} />
          <Route exact path="/orderDetails" component={OrderDetailPage} />
          <Route exact path="/createOrder" component={CreateOrderPage} />
          <Route exact path="/documentation" component={DocumentationPage} />
          <Route path="/error" component={ErrorPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
      <FooterComponent footerOptions={footerOptions} />
    </div>
  );
}

export default App;
