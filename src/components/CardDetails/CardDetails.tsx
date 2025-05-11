import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CarsContext } from '@/contexts/carsContext';
import Accordion from '@/components/Accordion/Accordion';
import { INITIAL_CURRENT_CAR_DATA } from '@/constants/constants';

import './CardDetails.css';

const CardDetails = (): JSX.Element => {
    const { setCurrentCar, currentCar } = useContext(CarsContext)!;
    const navigate = useNavigate();
    const { VITE_BACKEND_URL } = import.meta.env;

    useEffect(() => {
        if (currentCar._id === '') {
            navigate('/');
        }
    }, [currentCar._id, navigate]);

    const handleBackClick = () => {
        navigate('/');
        setCurrentCar(INITIAL_CURRENT_CAR_DATA);
    };

    return (
        <div className='CardDetails'>
            <div className='CardDetails-name'>
                <span
                    className='CardDetails-back-action'
                    onClick={handleBackClick}
                >
                    {'<-'}
                </span>
                {currentCar.name}
            </div>

            <div className='CardDetails-content-container'>
                <div className='CardDetails-img-specifications-container'>
                    <img
                        alt='Car image'
                        className='CardDetails-img'
                        src={`${VITE_BACKEND_URL}/${currentCar.img}`}
                    />

                    <div className='CardDetails-title-specifications-container'>
                        <h3 className='CardDetails-specifications-title'>
                            Car specifications
                        </h3>
                        {Object.entries(currentCar.specifications).map(
                            ([key, value], index) => (
                                <div
                                    className='CardDetails-specifications-container'
                                    key={index}
                                >
                                    <span className='CardDetails-specification-key'>
                                        {key}:
                                    </span>{' '}
                                    <span>{value}</span>
                                </div>
                            )
                        )}
                    </div>
                </div>

                <Accordion />
            </div>
        </div>
    );
};

export default CardDetails;
