import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from '@/contexts/authContext';
import CarsProvider from '@/contexts/carsContext';

import App from './App.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarsProvider>
          <App />
        </CarsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
