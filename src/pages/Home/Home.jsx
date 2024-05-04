import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/contexts/authContext';
import { CarsContext } from '@/contexts/carsContext';
import Hero from '@/components/Hero/Hero';
import CardList from '@/components/CardList/CardList';
import Spinner from '@/components/Spinner/Spinner';

import './Home.css';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { getAllCars, cars } = useContext(CarsContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [carsFasterThan150, setCarsFasterThan150] = useState([]);
  const [carsNotOnTheMarket, setCarsNotOnTheMarket] = useState([]);

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Fetch all cars
      getAllCars();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Once cars are fetched, filter them based on criteria
    if (cars.length > 0) {
      const fasterThan150 = cars.filter(car => {
        const topSpeedNumeric = parseInt(car.specifications.topSpeed);
        return topSpeedNumeric > 150;
      });
      setCarsFasterThan150(fasterThan150);

      const notOnMarket = cars.filter(car => !car.available_in_market);
      setCarsNotOnTheMarket(notOnMarket);

      setLoading(false); // Set loading to false once data is processed
    }
  }, [cars]);

  return (
    <div className='Home'>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Hero />
          <div className='Home-content'>
            <div className='Home-section'>
              <h2>Check the fastest Ev's</h2>
              <CardList cars={carsFasterThan150} />
            </div>

            <div>
              <h2>Explore the amazing cars that can't be bought</h2>
              <CardList cars={carsNotOnTheMarket} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

