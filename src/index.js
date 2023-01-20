import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/index.css';
import App from './App';
import 'antd/dist/reset.css'
import store from './reducers/store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
   <App />
 </Provider>
   
 
);


