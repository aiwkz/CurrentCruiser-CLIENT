import { createContext, useState, useEffect } from 'react';

import { fetchData } from '@/utils/utils';

// Create a new context for managing lists
export const ListsContext = createContext();

// Define the context provider component
const ListsProvider = ({ children }) => {
  // State to store lists
  const [lists, setLists] = useState([]);

  // State to store currentList
  const [currentlistId, setCurrentListId] = useState('');

  // State to handle errors
  const [error, setError] = useState(null);

  // State to store the token
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Import backend ULR form env file
  const { VITE_BACKEND_URL } = import.meta.env;

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  // Function to create a new list
  const createList = async (newList) => {
    try {
      await fetchData({
        url: `${VITE_BACKEND_URL}/lists/create`,
        method: 'POST',
        body: newList,
        callback: (response) => setLists([...lists, response.list])
      });
    } catch (error) {
      setError(error);
    }
  };

  // Function to fetch all lists from the API
  const getAllLists = async () => {
    try {
      await fetchData({
        url: `${VITE_BACKEND_URL}/lists/all`,
        token,
        callback: (response) => setLists(response.lists)
      });
    } catch (error) {
      setError(error);
    }
  };

  // Function to fetch list by listId
  const getListById = async (id) => {
    try {
      await fetchData({
        url: `${VITE_BACKEND_URL}/lists/${id}`,
        callback: (response) => setLists(response.list)
      });
    } catch (error) {
      setError(error);
    }
  };

  // Function to fetch lists by userId
  const getListsByUserId = async (userId) => {
    try {
      await fetchData({
        url: `${VITE_BACKEND_URL}/lists/user/${userId}`,
        callback: (response) => setLists(response.lists)
      });
    } catch (error) {
      setError(error);
    }
  };

  // Function to update an existing list
  const updateList = async (id, updatedList) => {
    try {
      const response = await fetchData({
        url: `${VITE_BACKEND_URL}/lists/${id}`,
        method: 'PUT',
        body: updatedList,
      });
      const updatedLists = lists.map((list) => (list._id === id ? response.list : list));
      setLists(updatedLists);
    } catch (error) {
      setError(error);
    }
  };

  // Function to delete a list
  const deleteList = async (id) => {
    try {
      await fetchData({
        url: `${VITE_BACKEND_URL}/lists/${id}`,
        method: 'DELETE',
      });
      const updatedLists = lists.filter((list) => list._id !== id);
      setLists(updatedLists);
    } catch (error) {
      setError(error);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ListsContext.Provider
      value={{
        lists,
        setLists,
        currentlistId,
        setCurrentListId,
        error,
        createList,
        getAllLists,
        getListById,
        getListsByUserId,
        updateList,
        deleteList,
        clearError,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export default ListsProvider;
