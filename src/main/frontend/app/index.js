import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import App from './App';
import './index.css';
import registerServiceWorker from './serviceWorker';


// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href =
  'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css';


const styleLink2 = document.createElement('link');
styleLink2.rel = 'stylesheet';
styleLink2.href =
    'https://fonts.googleapis.com/icon?family=Material+Icons';


document.head.appendChild(styleLink);
document.head.appendChild(styleLink2);

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>,
  document.querySelector('.appContainer')
);
registerServiceWorker();
