import { useState } from 'react';

import Slider from '@/components/Slider/Slider';
import { useCarsStore } from '@/stores/carsStore';

import './Hero.css';

const Hero = (): JSX.Element => {
  const cars = useCarsStore(state => state.cars);

  const [currentCarIndex, setCurrentCarIndex] = useState(() => {
    if (cars.length === 0) return 0;
    return Math.floor(Math.random() * cars.length);
  });

  return (
    <div className='Hero'>
      {cars.length > 0 && (
        <Slider
          cars={cars}
          currentIndex={currentCarIndex}
          onChangeIndex={setCurrentCarIndex}
        />
      )}
    </div>
  );
};

export default Hero;
