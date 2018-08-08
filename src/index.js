import ReactDOM from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import App from './components/App';

import authStore from './stores/authStore';
import commonStore from './stores/commonStore';
import userStore from './stores/userStore';

// importing only what is necessary for semantic-ui form component
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const stores = {
  authStore,
  commonStore,
  userStore,
};

// For easier debugging
window._____APP_STATE_____ = stores;

promiseFinally.shim();
configure({ enforceActions: true });

ReactDOM.render((
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
