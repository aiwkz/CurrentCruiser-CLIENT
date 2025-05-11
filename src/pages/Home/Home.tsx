import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/contexts/authContext';
import { CarsContext } from '@/contexts/carsContext';
import Hero from '@/components/Hero/Hero';
import CardList from '@/components/CardList/CardList';
import Spinner from '@/components/Spinner/Spinner';
import { Car } from '@/types';

import './Home.css';

const Home = () => {
    const { user } = useContext(AuthContext)!;
    const { getAllCars, cars } = useContext(CarsContext)!;
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [carsFasterThan150, setCarsFasterThan150] = useState<Car[]>([]);
    const [carsNotOnTheMarket, setCarsNotOnTheMarket] = useState<Car[]>([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            getAllCars();
        }
    }, [user]);

    useEffect(() => {
        if (cars.length > 0) {
            const fasterThan150 = cars.filter((car: Car) => {
                const topSpeed = parseInt(car.specifications.topSpeed);
                return topSpeed > 150;
            });
            setCarsFasterThan150(fasterThan150);

            const notOnMarket = cars.filter(
                (car: Car) => !car.availableInMarket
            );
            setCarsNotOnTheMarket(notOnMarket);

            setLoading(false);
        }
    }, [cars]);

    return (
        <div className='Home'>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Hero />
                    <div className='Home-content'>
                        <div className='Home-section'>
                            <h2>Check the fastest Ev's</h2>
                            <CardList cars={carsFasterThan150} />
                        </div>

                        <div>
                            <h2>
                                Explore the amazing cars that can't be bought
                            </h2>
                            <CardList cars={carsNotOnTheMarket} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
