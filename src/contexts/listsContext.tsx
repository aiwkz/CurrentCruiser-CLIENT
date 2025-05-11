import { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchData } from '@/utils/utils';
import { List } from '@/types';

interface ListsContextType {
    lists: List[];
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
    currentlistId: string;
    setCurrentListId: React.Dispatch<React.SetStateAction<string>>;
    error: unknown;
    createList: (newList: Partial<List>) => Promise<void>;
    getAllLists: () => Promise<void>;
    getListById: (id: string) => Promise<void>;
    getListsByUserId: (userId: string) => Promise<void>;
    updateList: (id: string, updatedList: Partial<List>) => Promise<void>;
    deleteList: (id: string) => Promise<void>;
    clearError: () => void;
}

export const ListsContext = createContext<ListsContextType | undefined>(
    undefined
);

interface ListsProviderProps {
    children: ReactNode;
}

const ListsProvider = ({ children }: ListsProviderProps) => {
    const [lists, setLists] = useState<List[]>([]);
    const [currentlistId, setCurrentListId] = useState<string>('');
    const [error, setError] = useState<unknown>(null);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    );

    const { VITE_BACKEND_URL } = import.meta.env;

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const createList = async (newList: Partial<List>) => {
        try {
            await fetchData<{ list: List }>({
                url: `${VITE_BACKEND_URL}/lists/create`,
                method: 'POST',
                body: newList,
                callback: response => setLists([...lists, response.list]),
            });
        } catch (error) {
            setError(error);
        }
    };

    const getAllLists = async () => {
        try {
            await fetchData<{ lists: List[] }>({
                url: `${VITE_BACKEND_URL}/lists/all`,
                token,
                callback: response => setLists(response.lists),
            });
        } catch (error) {
            setError(error);
        }
    };

    const getListById = async (id: string) => {
        try {
            await fetchData<{ list: List }>({
                url: `${VITE_BACKEND_URL}/lists/${id}`,
                callback: response => setLists([response.list]),
            });
        } catch (error) {
            setError(error);
        }
    };

    const getListsByUserId = async (userId: string) => {
        try {
            await fetchData<{ lists: List[] }>({
                url: `${VITE_BACKEND_URL}/lists/user/${userId}`,
                callback: response => setLists(response.lists),
            });
        } catch (error) {
            setError(error);
        }
    };

    const updateList = async (id: string, updatedList: Partial<List>) => {
        try {
            await fetchData<{ list: List }>({
                url: `${VITE_BACKEND_URL}/lists/${id}`,
                method: 'PUT',
                body: updatedList,
                callback: response => {
                    const updatedLists = lists.map(list =>
                        list._id === id ? response.list : list
                    );
                    setLists(updatedLists);
                },
            });
        } catch (error) {
            setError(error);
        }
    };

    const deleteList = async (id: string) => {
        try {
            await fetchData({
                url: `${VITE_BACKEND_URL}/lists/${id}`,
                method: 'DELETE',
            });
            const updatedLists = lists.filter(list => list._id !== id);
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
