import { useEffect, useMemo, useState } from 'react';
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
  const { cars, getAllCars } = useCarsStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        await getAllCars();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
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
      {loading ? (
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
