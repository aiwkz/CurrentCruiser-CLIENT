import { Routes, Route } from 'react-router-dom';

import Layout from '@/layouts/DefaultLayout/DefaultLayout';
import Home from '@/pages/Home/Home';
import Lists from '@/pages/Lists/Lists';
import NotFound from '@/components/NotFound/NotFound';
import RegisterForm from '@/components/RegisterForm/RegisterForm';
import LoginForm from '@/components/LoginForm/LoginForm';
import CardDetails from '@/components/CardDetails/CardDetails';
import TermsOfService from '@/components/TermsOfService/TermsOfService';
import PrivacyPolicy from '@/components/PrivacyPolicy/PrivacyPolicy';

import './App.css'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />

        <Route index element={<Home />} />

        <Route path='/car-details' element={<CardDetails />} />
        <Route path='/lists' element={<Lists />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
