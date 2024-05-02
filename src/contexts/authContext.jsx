import { createContext, useState, useEffect } from 'react';

import { INITIAL_USER_DATA } from '../constants/constants';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(INITIAL_USER_DATA);

  useEffect(() => {
    // Check if user is already authenticated on initial load
    const token = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('user');

    if (token && storedUserData && !isAuthenticated) {
      // Parse the stored user data back into an object
      const userData = JSON.parse(storedUserData);
      // Set user as authenticated
      setIsAuthenticated(true);
      // Set user data
      setUser(userData);
    }
  }, []);

  const login = (token, userData) => {
    // Save token to local storage
    localStorage.setItem('token', token);
    // Save user data to local storage after stringifying it
    localStorage.setItem('user', JSON.stringify(userData));
    // Set user as authenticated
    setIsAuthenticated(true);
    // Set user data
    setUser(userData);
  };

  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Remove user from local storage
    localStorage.removeItem('user');
    // Set user as not authenticated
    setIsAuthenticated(false);
    // Clear user data
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
