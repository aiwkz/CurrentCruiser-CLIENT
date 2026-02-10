import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import { useListsStore } from '@/stores/listsStore';
import { useCarsStore } from '@/stores/carsStore';
import CardList from '@/components/CardList/CardList';
import Spinner from '@/components/Spinner/Spinner';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';

import { Car } from '@/types';

import './Lists.css';

interface UserList {
  id: string;
  listTitle: string;
  cars: Car[];
}

const Lists = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useAuthStore(state => state.user);

  const lists = useListsStore(state => state.lists);
  const setCurrentListId = useListsStore(state => state.setCurrentListId);
  const getAllLists = useListsStore(state => state.getAllLists);
  const getListsByUserId = useListsStore(state => state.getListsByUserId);
  const deleteList = useListsStore(state => state.deleteList);
  const isLoadingLists = useListsStore(state => state.isLoading);

  const cars = useCarsStore(state => state.cars);
  const getAllCars = useCarsStore(state => state.getAllCars);
  const isLoadingCars = useCarsStore(state => state.isLoading);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    getAllCars();
    if (user.role === 'admin') getAllLists();
    else getListsByUserId(user._id);
  }, [user, navigate, getAllCars, getAllLists, getListsByUserId]);

  const userLists: UserList[] = useMemo(() => {
    if (!lists.length || !cars.length) return [];

    const carsById = new Map(cars.map(car => [car._id, car]));

    return lists.map(list => ({
      id: list._id,
      listTitle: list.title,
      cars: list.cars
        .map(c => carsById.get(c._id))
        .filter((c): c is Car => Boolean(c)),
    }));
  }, [lists, cars]);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleEdit = (id: string) => {
    setCurrentListId(id);
    toggleModal();
  };

  const handleDelete = async (id: string) => {
    await deleteList(id);
  };

  const loading = isLoadingCars || isLoadingLists;

  return (
    <div className='Lists'>
      <Button className='Lists-add-button' onClick={toggleModal}>
        Create List
      </Button>

      <Modal isOpen={isModalOpen} toggleModal={toggleModal} />

      <h2 className='Lists-title'>Your Lists</h2>

      {loading ? (
        <Spinner />
      ) : userLists.length > 0 ? (
        userLists.map(list => (
          <div key={list.id} className='Lists-list-container'>
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
