import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import App from './App';
import registerServiceWorker from './serviceWorker';

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href =
  'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>,
  document.querySelector('.appContainer')
);
registerServiceWorker();
