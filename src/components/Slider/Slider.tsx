import { useEffect } from 'react';

import SliderCard from '@/components/SliderCard/SliderCard';
import { Car } from '@/types';

import './Slider.css';

interface SliderProps {
  cars: Car[];
  currentIndex: number;
  onChangeIndex: (updater: (prevIndex: number) => number) => void;
}

const Slider = ({
  cars,
  currentIndex,
  onChangeIndex,
}: SliderProps): JSX.Element => {
  useEffect(() => {
    const interval = setInterval(() => {
      onChangeIndex(prevIndex => (prevIndex + 1) % cars.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [cars, onChangeIndex]);

  const handlePrevClick = () => {
    onChangeIndex(prevIndex => (prevIndex - 1 + cars.length) % cars.length);
  };

  const handleNextClick = () => {
    onChangeIndex(prevIndex => (prevIndex + 1) % cars.length);
  };

  return (
    <div className='Slider'>
      <button className='Slider-prev-button' onClick={handlePrevClick}>
        {'<'}
      </button>

      <SliderCard
        className='Slider-card'
        name={cars[currentIndex].name}
        img={cars[currentIndex].img}
        history={cars[currentIndex].history}
      />

      <button className='Slider-next-button' onClick={handleNextClick}>
        {'>'}
      </button>
    </div>
  );
};

export default Slider;
