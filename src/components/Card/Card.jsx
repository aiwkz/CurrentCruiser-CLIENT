import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CarsContext } from '@/contexts/carsContext';

import './Card.css';

const Card = ({ _id, img, name, description }) => {
  const { cars, setCurrentCar, currentCar } = useContext(CarsContext);
  const navigate = useNavigate();
  const { VITE_BACKEND_URL } = import.meta.env;

  const handleCardClick = () => {
    setCurrentCar(cars.find(car => car._id === _id));
    navigate('/car-details');
  }

  return (
    <div className='Card' onClick={handleCardClick}>
      <img alt='Car image' className='Card-img' src={`${VITE_BACKEND_URL}/${img}`} />

      <div className='Card-name-description-container'>
        <div className='Card-name'>{name}</div>
        <div className='Card-description'>{description}</div>
      </div>
    </div>
  )
};

export default Card;
