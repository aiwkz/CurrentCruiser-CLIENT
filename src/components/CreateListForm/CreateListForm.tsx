import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCarsStore } from '@/stores/carsStore';
import { useListsStore } from '@/stores/listsStore';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/Button/Button';
import { INITIAL_LIST_FORM_STATE } from '@/constants/constants';
import { List } from '@/types';

import './CreateListForm.css';

interface CreateListFormProps {
    toggleModal: () => void;
}

const CreateListForm = ({ toggleModal }: CreateListFormProps): JSX.Element => {
    const cars = useCarsStore(state => state.cars);
    const lists = useListsStore(state => state.lists);
    const setLists = useListsStore(state => state.setLists);
    const currentListId = useListsStore(state => state.currentListId);
    const createList = useListsStore(state => state.createList);
    const updateList = useListsStore(state => state.updateList);
    const user = useAuthStore(state => state.user);
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const [selectedCarIds, setSelectedCarIds] = useState<string[]>([]);
    const listToEdit = lists.find(list => list._id === currentListId);
    const [formData, setFormData] = useState<List>(
        listToEdit ? listToEdit : INITIAL_LIST_FORM_STATE
    );

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    useEffect(() => {
        if (listToEdit) {
            setSelectedCarIds(listToEdit.cars.map(car => car._id));
        }
    }, [listToEdit]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCarSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        const updatedSelectedCarIds = selectedCarIds.includes(value)
            ? selectedCarIds.filter(id => id !== value)
            : [...selectedCarIds, value];
        setSelectedCarIds(updatedSelectedCarIds);

        setFormData({
            ...formData,
            userId: user!._id,
            cars: cars.filter(car => updatedSelectedCarIds.includes(car._id)),
        });
    };

    const handleEdit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await updateList(currentListId, formData);
            setLists(
                lists.map(list =>
                    list._id === currentListId ? formData : list
                )
            );
            toggleModal();
            setFormData(INITIAL_LIST_FORM_STATE);
            setSelectedCarIds([]);
        } catch (error) {
            console.error('Fetch error:', (error as Error).message);
            setError('An error occurred while editing list');
        }
    };

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await createList(formData);
            toggleModal();
            setFormData(INITIAL_LIST_FORM_STATE);
            setSelectedCarIds([]);
        } catch (error) {
            console.error('Fetch error:', (error as Error).message);
            setError('An error occurred while creating list');
        }
    };

    return (
        <form className='CreateListForm'>
            <label className='CreateListForm-input'>
                <h3>List Title</h3>
                <input
                    type='text'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <label className='CreateListForm-input'>
                <h3>Select Cars</h3>
                <select
                    name='cars'
                    multiple
                    value={selectedCarIds}
                    onChange={handleCarSelect}
                    required
                >
                    {cars.map(car => (
                        <option
                            key={car._id}
                            value={car._id}
                        >
                            {car.name}
                        </option>
                    ))}
                </select>
            </label>
            {currentListId ? (
                <Button
                    type='submit'
                    onClick={handleEdit}
                >
                    Edit
                </Button>
            ) : (
                <Button
                    type='submit'
                    onClick={handleCreate}
                >
                    Create List
                </Button>
            )}
            {error && <div className='CreateListForm-error'>{error}</div>}
        </form>
    );
};

export default CreateListForm;
