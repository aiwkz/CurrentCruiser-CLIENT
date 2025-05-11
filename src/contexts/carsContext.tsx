import { createContext, useState, ReactNode } from 'react';

import { fetchData } from '@/utils/utils';
import { INITIAL_CURRENT_CAR_DATA } from '@/constants/constants';
import { Car } from '@/types';

interface CarsContextType {
    cars: Car[];
    setCars: React.Dispatch<React.SetStateAction<Car[]>>;
    currentCar: typeof INITIAL_CURRENT_CAR_DATA;
    setCurrentCar: React.Dispatch<
        React.SetStateAction<typeof INITIAL_CURRENT_CAR_DATA>
    >;
    error: unknown;
    getAllCars: () => Promise<void>;
    addCar: (newCar: Partial<Car>) => Promise<void>;
    updateCar: (id: string, updatedCar: Partial<Car>) => Promise<void>;
    deleteCar: (id: string) => Promise<void>;
    clearError: () => void;
}

export const CarsContext = createContext<CarsContextType | undefined>(
    undefined
);

interface CarsProviderProps {
    children: ReactNode;
}

const CarsProvider = ({ children }: CarsProviderProps) => {
    const [cars, setCars] = useState<Car[]>([]);
    const [currentCar, setCurrentCar] = useState<
        typeof INITIAL_CURRENT_CAR_DATA
    >(INITIAL_CURRENT_CAR_DATA);
    const [error, setError] = useState<unknown>(null);

    const { VITE_BACKEND_URL } = import.meta.env;

    const getAllCars = async () => {
        try {
            await fetchData({
                url: `${VITE_BACKEND_URL}/cars/all`,
                callback: (response: { cars: Car[] }) => setCars(response.cars),
            });
        } catch (error) {
            setError(error);
        }
    };

    const addCar = async (newCar: Partial<Car>) => {
        try {
            await fetchData({
                url: `${VITE_BACKEND_URL}/cars/create`,
                method: 'POST',
                body: newCar,
                callback: (response: { car: Car }) =>
                    setCars([...cars, response.car]),
            });
        } catch (error) {
            setError(error);
        }
    };

    const updateCar = async (id: string, updatedCar: Partial<Car>) => {
        try {
            await fetchData<{ car: Car }>({
                url: `${VITE_BACKEND_URL}/cars/${id}`,
                method: 'PUT',
                body: updatedCar,
                callback: response => {
                    const updatedCars = cars.map(car =>
                        car._id === id ? response.car : car
                    );
                    setCars(updatedCars);
                },
            });
        } catch (error) {
            setError(error);
        }
    };

    const deleteCar = async (id: string) => {
        try {
            await fetchData({
                url: `${VITE_BACKEND_URL}/cars/${id}`,
                method: 'DELETE',
            });
            const updatedCars = cars.filter(car => car._id !== id);
            setCars(updatedCars);
        } catch (error) {
            setError(error);
        }
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <CarsContext.Provider
            value={{
                cars,
                setCars,
                currentCar,
                setCurrentCar,
                error,
                getAllCars,
                addCar,
                updateCar,
                deleteCar,
                clearError,
            }}
        >
            {children}
        </CarsContext.Provider>
    );
};

export default CarsProvider;
