import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n';
import Routes from './routes';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import './css/App.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
    <ToastContainer/>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
