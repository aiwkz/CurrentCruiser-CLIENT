import { useContext, useEffect } from 'react';

import { CarsContext } from '@/contexts/carsContext';

import './Card.css';

const Card = ({ name, img, history }) => {
  const { getAllCars, cars } = useContext(CarsContext);
  const { VITE_BACKEND_URL } = import.meta.env;

  useEffect(() => {
    getAllCars();
  }, []);

  console.log('cars', cars);

  return (
    <div className='Card'>
      {cars.length > 0 &&
        <>
          {console.log(`${VITE_BACKEND_URL}/${cars[0].img}`)}
          <img alt='Car image' className='Card-img' src={`${VITE_BACKEND_URL}/${cars[0].img}`} />
          <div className='Card-name-history-container'>
            <h2 className='Card-name'>{cars[0].name}</h2>
            <div className='Card-history'>{cars[0].history}</div>
          </div>
        </>
      }
    </div>
  )
};

export default Card;
