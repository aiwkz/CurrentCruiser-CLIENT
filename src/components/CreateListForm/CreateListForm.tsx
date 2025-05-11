import { useContext, useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { CarsContext } from '@/contexts/carsContext';
import { ListsContext } from '@/contexts/listsContext';
import { AuthContext } from '@/contexts/authContext';
import Button from '@/components/Button/Button';
import { INITIAL_LIST_FORM_STATE } from '@/constants/constants';
import { List } from '@/types';

import './CreateListForm.css';
import { useNavigate } from 'react-router-dom';

interface CreateListFormProps {
    toggleModal: () => void;
}

const CreateListForm = ({ toggleModal }: CreateListFormProps): JSX.Element => {
    const { cars } = useContext(CarsContext)!;
    const { currentlistId, createList, lists, updateList, setLists } =
        useContext(ListsContext)!;
    const { user } = useContext(AuthContext)!;
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const [selectedCarIds, setSelectedCarIds] = useState<string[]>([]);
    const listToEdit = lists.find(list => list._id === currentlistId);
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
            await updateList(currentlistId, formData);
            setLists(
                lists.map(list =>
                    list._id === currentlistId ? formData : list
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
            {currentlistId ? (
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
