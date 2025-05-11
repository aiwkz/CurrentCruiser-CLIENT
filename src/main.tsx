import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from '@/contexts/authContext';
import CarsProvider from '@/contexts/carsContext';
import ListsProvider from '@/contexts/listsContext';

import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CarsProvider>
                    <ListsProvider>
                        <App />
                    </ListsProvider>
                </CarsProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
