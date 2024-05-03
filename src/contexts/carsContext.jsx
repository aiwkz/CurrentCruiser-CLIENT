import React, { createContext, useState } from 'react';

import { fetchData } from '@/utils/utils';
import { INITIAL_CURRENT_CAR_DATA } from '@/constants/constants';

// Create a new context for managing cars
export const CarsContext = createContext();

// Define the context provider component
const CarsProvider = ({ children }) => {
  // State to store the list of cars
  const [cars, setCars] = useState([]);

  // State to store the current selected car
  const [currentCar, setCurrentCar] = useState(INITIAL_CURRENT_CAR_DATA);

  // State to handle errors
  const [error, setError] = useState(null);

  // Import backend ULR form env file
  const { VITE_BACKEND_URL } = import.meta.env;

  // Function to fetch all cars from the API
  const getAllCars = async () => {
    try {
      await fetchData({
        url: `${VITE_BACKEND_URL}/cars/all`,
        callback: (response) => setCars(response.cars)
      });
    } catch (error) {
      setError(error);
    }
  };

  // Function to add a new car
  const addCar = async (newCar) => {
    try {
      await fetchData({
        url: `${VITE_BACKEND_URL}/cars/create`,
        method: 'POST',
        body: newCar,
        callback: (response) => setCars([...cars, response.car])
      });
    } catch (error) {
      setError(error);
    }
  };

  // Function to update an existing car
  const updateCar = async (id, updatedCar) => {
    try {
      const response = await fetchData({
        url: `${VITE_BACKEND_URL}/cars/${id}`,
        method: 'PUT',
        body: updatedCar
      });
      const updatedCars = cars.map(car =>
        car._id === id ? response.car : car
      );
      setCars(updatedCars);
    } catch (error) {
      setError(error);
    }
  };

  // Function to delete a car
  const deleteCar = async (id) => {
    try {
      await fetchData({
        url: `${VITE_BACKEND_URL}/cars/${id}`,
        method: 'DELETE'
      });
      const updatedCars = cars.filter(car => car._id !== id);
      setCars(updatedCars);
    } catch (error) {
      setError(error);
    }
  };

  // Function to clear errors
  const clearError = () => {
    setError(null);
  };

  // Provide the context value to children components
  return (
    <CarsContext.Provider
      value={{
        cars,
        currentCar,
        setCurrentCar,
        error,
        getAllCars,
        addCar,
        updateCar,
        deleteCar,
        clearError
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};

export default CarsProvider;
