import { useNavigate } from 'react-router-dom';
import { Car } from '@/types';
import { useCarsStore } from '@/stores/carsStore';

interface CardProps {
  _id: string;
  img: string;
  name: string;
  description: string;
}

const Card = ({ _id, img, name, description }: CardProps) => {
  const cars = useCarsStore(state => state.cars);
  const setCurrentCar = useCarsStore(state => state.setCurrentCar);
  const navigate = useNavigate();
  const { VITE_BACKEND_URL } = import.meta.env;

  const handleCardClick = () => {
    const selectedCar = cars.find((car: Car) => car._id === _id);
    if (selectedCar) {
      setCurrentCar(selectedCar);
      navigate('/car-details');
    }
  };

  return (
    <div className='Card' onClick={handleCardClick}>
      <img
        alt='Car image'
        className='Card-img'
        src={`${VITE_BACKEND_URL}/${img}`}
      />
      <div className='Card-name-description-container'>
        <div className='Card-name'>{name}</div>
        <div className='Card-description'>{description}</div>
      </div>
    </div>
  );
};

export default Card;
