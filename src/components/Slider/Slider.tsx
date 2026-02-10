import { useEffect } from 'react';
import { Car } from '@/types';

import './Slider.css';

interface SliderProps {
  cars: Car[];
  currentIndex: number;
  onChangeIndex: (updater: (prevIndex: number) => number) => void;
  onViewDetails: (car: Car) => void;
}

const Slider = ({
  cars,
  currentIndex,
  onChangeIndex,
  onViewDetails,
}: SliderProps): JSX.Element => {
  useEffect(() => {
    const interval = setInterval(() => {
      onChangeIndex(prevIndex => (prevIndex + 1) % cars.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [cars, onChangeIndex]);

  const car = cars[currentIndex];
  const { VITE_BACKEND_URL } = import.meta.env;

  return (
    <div className='Slider'>
      <div className='Slider-hero'>
        <div className='Slider-copy'>
          <h2 className='Slider-title'>Electric Cars Database</h2>

          <p className='Slider-subtitle'>
            Explore and manage the world of electric cars. Create your own lists
            of EVs you dream about, own, or admire.
          </p>

          <div className='Slider-actions'>
            <button
              type='button'
              className='Slider-btn Slider-btn--primary'
              onClick={() => onViewDetails(car)}
            >
              Details
            </button>
          </div>

          <div className='Slider-dots' aria-label='Featured cars'>
            {cars.slice(0, 6).map((_, index) => {
              const active = index === currentIndex;
              return (
                <button
                  key={index}
                  type='button'
                  className={`Slider-dot${active ? ' isActive' : ''}`}
                  onClick={() => onChangeIndex(() => index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={active}
                />
              );
            })}
          </div>
        </div>

        <div className='Slider-media' aria-hidden='true'>
          <div className='Slider-mediaBg' />
          <img
            className='Slider-image'
            src={`${VITE_BACKEND_URL}/assets/images/${car.img}`}
            alt={car.name}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
