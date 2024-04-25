import { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import Home from '@/components/Home/Home';
import NotFound from '@/components/NotFound/NotFound';
import RegisterForm from '@/components/RegisterForm/RegisterForm';
import LoginForm from '@/components/LoginForm/LoginForm';

import './App.css'

export const DataContext = createContext();

const App = () => {

  return (
    <DataContext.Provider value={{}}>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />

          <Route index element={<Home />} />
          <Route path='/lists' element={<Home />} />

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </DataContext.Provider>
  )
}

export default App
