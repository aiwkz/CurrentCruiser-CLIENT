import { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string, userData: User) => void;
    logout: () => Promise<void>;
    updateUser: (userData: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('user');

        const fetchUser = async () => {
            try {
                if (token && storedUserData) {
                    const userData: User = JSON.parse(storedUserData);
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    const updateUser = (userData: User) => {
        setUser(userData);
    };

    const cleanUserData = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    const login = (token: string, userData: User) => {
        cleanUserData();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        updateUser(userData);
    };

    const logout = async () => {
        await cleanUserData();
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, login, logout, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
