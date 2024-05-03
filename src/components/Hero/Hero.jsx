import { useContext, useEffect, useState } from 'react';

import Slider from '@/components/Slider/Slider';
import { CarsContext } from '@/contexts/carsContext';

import './Hero.css';

const Hero = () => {
  const { getAllCars, cars } = useContext(CarsContext);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  useEffect(() => {
    getAllCars();
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      const randomIndex = Math.floor(Math.random() * cars.length);
      setCurrentCarIndex(randomIndex);
    }
  }, [cars]);

  return (
    <div className='Hero'>
      {
        cars.length > 0 &&
        <Slider
          cars={cars}
          currentIndex={currentCarIndex}
          onChangeIndex={setCurrentCarIndex}
        />
      }
    </div>
  );
}

export default Hero;
