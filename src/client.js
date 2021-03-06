/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior';
import customScroll from 'utils/customScroll';
import getRoutes from './routes';
import ReactGA from 'react-ga';
import cofConfig from './config';
import ayaConfig from './ayaConfig';
import DevTools from './containers/DevTools/DevTools';

const client = new ApiClient();
const _browserHistory = useScroll(browserHistory, customScroll);
const dest = document.getElementById('content');
const store = createStore(_browserHistory, client, window.__data, { url: window.location.href });
const history = syncHistoryWithStore(_browserHistory, store);
const config = window.location.hostname === 'www.calloftheforest.com' ? cofConfig : ayaConfig;
const useDevTools = __DEVTOOLS__ && !window.devToolsExtension;

function initSocket() {
  const socket = io('', { path: '/ws' });
  socket.on('news', (data) => {
    console.log(data);
    socket.emit('my other event', { my: 'data from client' });
  });
  socket.on('msg', (data) => {
    console.log(data);
  });

  return socket;
}

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

global.socket = initSocket();
ReactGA.initialize(config.googleAnlaytics);

const component = (
  <Router onUpdate={logPageView} render={(props) =>
    <ReduxAsyncConnect {...props} helpers={{ client }} filter={item => !item.deferred} />
  } history={history}>
    {getRoutes(store)}
  </Router>
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

ReactDOM.render(
  <Provider store={store} key="provider">
    <div>
      {component}
      {!!useDevTools && <DevTools />}
    </div>
  </Provider>,
  dest
);
