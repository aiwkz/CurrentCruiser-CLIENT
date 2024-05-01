import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthProvider from '@/contexts/authContext';
import Layout from '@/components/Layout/Layout';
import Home from '@/components/Home/Home';
import NotFound from '@/components/NotFound/NotFound';
import RegisterForm from '@/components/RegisterForm/RegisterForm';
import LoginForm from '@/components/LoginForm/LoginForm';
import TermsOfService from '@/components/TermsOfService/TermsOfService';
import PrivacyPolicy from '@/components/PrivacyPolicy/PrivacyPolicy';

import './App.css'

export const DataContext = createContext();

const App = () => {

  return (
    <AuthProvider>
      <DataContext.Provider value={{}}>
        <Routes>
          <Route path='/' element={<Layout />}>

            <Route path='/register' element={<RegisterForm />} />
            <Route path='/login' element={<LoginForm />} />

            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />

            <Route path='/terms-of-service' element={<TermsOfService />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />

            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </DataContext.Provider>
    </AuthProvider>
  )
}

export default App
