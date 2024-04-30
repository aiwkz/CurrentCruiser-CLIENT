import { createContext, useState, useEffect } from 'react';

import { INITIAL_USER_DATA } from '../constants/constants';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(INITIAL_USER_DATA);

  useEffect(() => {
    // Check if user is already authenticated on initial load
    const token = localStorage.getItem('token');

    if (token && !isAuthenticated) {
      // Set user as authenticated
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token, userData) => {
    // Save token to session storage or local storage
    localStorage.setItem('token', token);
    // Set user as authenticated
    setIsAuthenticated(true);
    // Set user data
    setUser(userData);
  };

  const logout = () => {
    // Remove token from session storage or local storage
    localStorage.removeItem('token');
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
