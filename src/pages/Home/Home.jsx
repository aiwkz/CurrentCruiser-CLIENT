import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/contexts/authContext';
import CarsProvider from '@/contexts/carsContext';
import Hero from '@/components/Hero/Hero'

import './Home.css';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    };
  }, []);


  return (
    <CarsProvider>
      <>
        <Hero />
      </>
    </CarsProvider>
  );
};

export default Home;
