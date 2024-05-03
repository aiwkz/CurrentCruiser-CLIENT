import { useState, useContext } from 'react';

import { CarsContext } from '@/contexts/carsContext';

import './Accordion.css';

const Accordion = () => {
  const [activeTitle, setActiveTitle] = useState(null);
  const { currentCar } = useContext(CarsContext);
  const { history, description } = currentCar;

  const handleClick = (title) => {
    setActiveTitle(activeTitle === title ? null : title);
  };

  return (
    <div className='Accordion'>
      {Object.entries({ history, description }).map(([key, value], index) => (
        <div className='Accordion-item-container' key={index}>
          <button
            className={`Accordion-title ${activeTitle === key ? 'active' : ''}`}
            onClick={() => handleClick(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
          {activeTitle === key && (
            <div className='Accordion-content'>
              {value}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;

