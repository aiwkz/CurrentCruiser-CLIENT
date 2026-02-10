import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Slider from '@/components/Slider/Slider';
import { useCarsStore } from '@/stores/carsStore';
import { Car } from '@/types';

import './Hero.css';

const Hero = (): JSX.Element => {
  const cars = useCarsStore(state => state.cars);
  const setCurrentCar = useCarsStore(state => state.setCurrentCar);

  const navigate = useNavigate();

  const [currentCarIndex, setCurrentCarIndex] = useState(() => {
    if (cars.length === 0) return 0;
    return Math.floor(Math.random() * cars.length);
  });

  const handleViewDetails = (car: Car) => {
    setCurrentCar(car);
    navigate('/car-details');
  };

  return (
    <section className='Hero'>
      <div className='Hero-inner'>
        <div className='Hero-surface'>
          {cars.length > 0 && (
            <Slider
              cars={cars}
              currentIndex={currentCarIndex}
              onChangeIndex={setCurrentCarIndex}
              onViewDetails={handleViewDetails}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
