import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '@/types';
import { CarsContext } from '@/contexts/carsContext';

interface CardProps {
    _id: string;
    img: string;
    name: string;
    description: string;
}

const Card = ({ _id, img, name, description }: CardProps) => {
    const carsContext = useContext(CarsContext);
    const navigate = useNavigate();
    const { VITE_BACKEND_URL } = import.meta.env;

    if (!carsContext) {
        throw new Error('Card must be used within a CarsProvider');
    }

    const { cars, setCurrentCar } = carsContext;

    const handleCardClick = () => {
        const selectedCar = cars.find((car: Car) => car._id === _id);
        if (selectedCar) {
            setCurrentCar(selectedCar);
            navigate('/car-details');
        }
    };

    return (
        <div
            className='Card'
            onClick={handleCardClick}
        >
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
