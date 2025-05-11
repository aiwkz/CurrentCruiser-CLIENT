import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/contexts/authContext';
import { ListsContext } from '@/contexts/listsContext';
import { CarsContext } from '@/contexts/carsContext';
import CardList from '@/components/CardList/CardList';
import Spinner from '@/components/Spinner/Spinner';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';

import { User, List, Car } from '@/types';

import './Lists.css';

interface UserList {
    id: string;
    listTitle: string;
    cars: Car[];
}

const Lists = (): JSX.Element => {
    const [userLists, setUserLists] = useState<UserList[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { user } = useContext(AuthContext)!;
    const {
        getListsByUserId,
        getAllLists,
        lists,
        setLists,
        setCurrentListId,
        deleteList,
    } = useContext(ListsContext)!;
    const { cars, getAllCars } = useContext(CarsContext)!;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        setLists([]);
        getAllCars();

        if (user.role === 'admin') {
            getAllLists();
        } else {
            getListsByUserId(user._id);
        }
    }, [user]);

    useEffect(() => {
        setUserLists([]);

        if (lists && lists.length > 0 && cars.length > 0) {
            const userListsWithCars: UserList[] = lists.map(list => {
                const carsInList = cars.filter(car =>
                    list.cars.map(c => c._id).includes(car._id)
                );
                return {
                    id: list._id,
                    listTitle: list.title,
                    cars: carsInList,
                };
            });
            setUserLists(userListsWithCars);
            setLoading(false);
        } else {
            setUserLists([]);
            setLoading(false);
        }
    }, [lists, cars]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleEdit = (id: string) => {
        setCurrentListId(id);
        toggleModal();
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteList(id);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Fetch error:', error.message);
            } else {
                console.error('Fetch error:', error);
            }
        }
    };

    return (
        <div className='Lists'>
            <Button
                className='Lists-add-button'
                onClick={toggleModal}
            >
                Create List
            </Button>

            <Modal
                isOpen={isModalOpen}
                toggleModal={toggleModal}
            />

            <h2 className='Lists-title'>Your Lists</h2>

            {loading ? (
                <Spinner />
            ) : userLists.length > 0 ? (
                userLists.map(list => (
                    <div
                        key={list.id}
                        className='Lists-list-container'
                    >
                        <div className='Lists-action-buttons-container'>
                            <h3>{list.listTitle}</h3>
                            <span
                                className='Lists-button'
                                onClick={() => handleEdit(list.id)}
                            >
                                Edit List
                            </span>
                            <button
                                className='Lists-button Lists-delete-action'
                                onClick={() => handleDelete(list.id)}
                            >
                                Delete List
                            </button>
                        </div>

                        <CardList cars={list.cars} />
                    </div>
                ))
            ) : (
                <div>No lists found</div>
            )}
        </div>
    );
};

export default Lists;
