import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('user');

    const fetchUser = async () => {
      try {
        if (token && storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clean user data
  const cleanUserData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const login = (token, userData) => {
    // Clean user data before setting new data
    cleanUserData();

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    updateUser(userData); // Update user data
  };

  const logout = async () => {
    // Clean user data upon logout
    await cleanUserData();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
