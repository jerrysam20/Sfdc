/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ExplorePage from './Pages/Explore/ExplorePage';
import HomePage from './Pages/Home/Home';
import ScanPage from './Pages/ScanPage/ScanPage';
import SummaryPage from './Pages/SummaryPage/SummaryPage';
import ReportHistory from './Pages/ReportHistory/ReportHistory';
import ErrorPage from './Pages/Error/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterComponent from './Components/Footer/Footer';
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
          <Route exact path="/explore" component={ExplorePage} />
          <Route exact path="/scan/:id" component={ScanPage} />
          <Route exact path="/summary" component={SummaryPage} />
          <Route exact path="/documentation" component={DocumentationPage} />
          <Route exact path="/reports" component={ReportHistory} />
          <Route path="/error" component={ErrorPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
      <FooterComponent footerOptions={footerOptions} />
    </div>
  );
}

export default App;
