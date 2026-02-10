import { useNavigate } from 'react-router-dom';

import { Car } from '@/types';
import { useCarsStore } from '@/stores/carsStore';

import './Card.css';

interface CardProps {
  car: Car;
  onAddToList?: (car: Car) => void;
}

const Card = ({ car, onAddToList }: CardProps) => {
  const setCurrentCar = useCarsStore(state => state.setCurrentCar);
  const navigate = useNavigate();
  const { VITE_BACKEND_URL } = import.meta.env;

  const handleViewDetails = () => {
    setCurrentCar(car);
    navigate('/car-details');
  };

  const handleAddToList = () => {
    if (onAddToList) {
      onAddToList(car);
      return;
    }
    // don't have the feature wired yet
    // Later open a modal / navigate to list form / etc.
    console.log('Add to list clicked:', car._id);
  };

  return (
    <article className='Card'>
      <div className='Card-media'>
        <img
          alt={`${car.name} image`}
          className='Card-img'
          src={`${VITE_BACKEND_URL}/assets/images/${car.img}`}
        />
      </div>

      <div className='Card-body'>
        <h3 className='Card-title'>{car.name}</h3>

        <p className='Card-meta'>
          <span>0-60: {car.specifications.mph0to60} seconds</span>
          <span>Top Speed: {car.specifications.topSpeed} mph</span>
          <span>Power: {car.specifications.horsepower} hp</span>
        </p>

        <div className='Card-actions'>
          <button
            type='button'
            className='Card-btn Card-btn--primary'
            onClick={handleViewDetails}
          >
            View details
          </button>

          <button
            type='button'
            className='Card-btn Card-btn--ghost'
            onClick={handleAddToList}
          >
            Add to list
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;
