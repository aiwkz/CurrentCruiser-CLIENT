import { Outlet } from 'react-router-dom';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import './Layout.css';

const Layout = () => {
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

export default Layout;
