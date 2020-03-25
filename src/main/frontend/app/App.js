/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Home/Home';
import ScanPage from './Pages/ScanPage/ScanPage';
import ErrorPage from './Pages/Error/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './Components/Header/Header';
import DocumentationPage from './Pages/Documentation/Documentation';
import img1 from './assets/bg.jpg'

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
    <div className="App" style={{backgroundImage: "url(" + img1 + ")"}}>
      <HeaderComponent />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/generateCode" component={ScanPage} />
          <Route exact path="/documentation" component={DocumentationPage} />
          <Route path="/error" component={ErrorPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
