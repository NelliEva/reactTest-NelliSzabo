import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App';
import { BrowserRouter } from 'react-router-dom';
import {StoreProvider} from '../src/context/StoreContext';

ReactDOM.render(
  <BrowserRouter>
    <StoreProvider>
        <App />
    </StoreProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


