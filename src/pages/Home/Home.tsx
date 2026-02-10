import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import { useCarsStore } from '@/stores/carsStore';
import Hero from '@/components/Hero/Hero';
import CardList from '@/components/CardList/CardList';
import Spinner from '@/components/Spinner/Spinner';
import { Car } from '@/types';

import './Home.css';

const Home = () => {
  const user = useAuthStore(state => state.user);
  const cars = useCarsStore(state => state.cars);
  const isLoading = useCarsStore(state => state.isLoading);
  const getAllCars = useCarsStore(state => state.getAllCars);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    getAllCars();
  }, [user, navigate, getAllCars]);

  const carsFasterThan150 = useMemo(() => {
    return cars.filter((car: Car) => {
      const topSpeed = Number.parseInt(car.specifications.topSpeed, 10);
      return Number.isFinite(topSpeed) && topSpeed > 150;
    });
  }, [cars]);

  const carsNotOnTheMarket = useMemo(() => {
    return cars.filter((car: Car) => !car.availableInMarket);
  }, [cars]);

  return (
    <div className='Home'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Hero key={cars.length} />
          <div className='Home-content'>
            <div className='Home-section'>
              <h2>Check the fastest EVs</h2>
              <CardList cars={carsFasterThan150} />
            </div>

            <div>
              <h2>Explore the amazing cars that can&apos;t be bought</h2>
              <CardList cars={carsNotOnTheMarket} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
