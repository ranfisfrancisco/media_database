import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './configureStore';

import 'antd/dist/antd.css';

ReactDOM.render(
	<Provider store={store}>
    <App />
	</Provider>,
  document.getElementById('root')
);
