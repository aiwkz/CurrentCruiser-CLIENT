import { Outlet } from 'react-router-dom';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import './DefaultLayout.css';

const DefaultLayout = (): JSX.Element => {
  return (
    <div className='Layout'>
      <Header />

      <main className='content'>
        <div className='content-inner'>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DefaultLayout;
