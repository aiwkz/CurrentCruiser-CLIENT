import { useEffect, useState } from 'react';

import Slider from '@/components/Slider/Slider';
import { useCarsStore } from '@/stores/carsStore';

import './Hero.css';

const Hero = (): JSX.Element => {
    const cars = useCarsStore(state => state.cars);
    const [currentCarIndex, setCurrentCarIndex] = useState<number>(0);

    useEffect(() => {
        if (cars.length > 0) {
            const randomIndex = Math.floor(Math.random() * cars.length);
            setCurrentCarIndex(randomIndex);
        }
    }, [cars]);

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
