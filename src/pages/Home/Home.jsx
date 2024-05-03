import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/contexts/authContext';
import { CarsContext } from '@/contexts/carsContext';
import Hero from '@/components/Hero/Hero'
import CardList from '@/components/CardList/CardList'

import './Home.css';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { getAllCars, cars } = useContext(CarsContext);
  const navigate = useNavigate();
  const carsNotOnTheMarket = cars.filter(car => !car.available_in_market)
  const carsFasterThan150 = cars.filter(car => {
    // Extract the numeric part of the top speed string
    const topSpeedNumeric = parseInt(car.specifications.topSpeed);

    // Check if the numeric top speed is greater than 150
    return topSpeedNumeric > 150;
  });

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    };

    getAllCars();
  }, []);

  return (
    <div className='Home'>
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


    </div>
  );
};

export default Home;
