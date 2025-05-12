import { useState } from 'react';
import { useCarsStore } from '@/stores/carsStore';

import './Accordion.css';

const Accordion = (): JSX.Element => {
    const [activeTitle, setActiveTitle] = useState<string | null>(null);
    const currentCar = useCarsStore(state => state.currentCar);
    const { history, description } = currentCar;

    const handleClick = (title: string) => {
        setActiveTitle(activeTitle === title ? null : title);
    };

    return (
        <div className='Accordion'>
            {Object.entries({ history, description }).map(
                ([key, value], index) => (
                    <div
                        className='Accordion-item-container'
                        key={index}
                    >
                        <button
                            className={`Accordion-title ${
                                activeTitle === key ? 'active' : ''
                            }`}
                            onClick={() => handleClick(key)}
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </button>
                        {activeTitle === key && (
                            <div className='Accordion-content'>{value}</div>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default Accordion;
