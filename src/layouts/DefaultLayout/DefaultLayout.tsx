import { Outlet } from 'react-router-dom';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import './DefaultLayout.css';

const DefaultLayout = (): JSX.Element => {
  return (
    <>
      <Header />
      <div className='content'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
