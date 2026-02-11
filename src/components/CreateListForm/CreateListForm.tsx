import { useMemo, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCarsStore } from '@/stores/carsStore';
import { useListsStore } from '@/stores/listsStore';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/Button/Button';
import { INITIAL_LIST_FORM_STATE } from '@/constants/constants';
import './CreateListForm.css';

interface CreateListFormProps {
  handleToggle: () => void;
}

const CreateListForm = ({ handleToggle }: CreateListFormProps): JSX.Element => {
  const cars = useCarsStore(state => state.cars);

  const lists = useListsStore(state => state.lists);
  const currentListId = useListsStore(state => state.currentListId);
  const createList = useListsStore(state => state.createList);
  const updateList = useListsStore(state => state.updateList);

  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  const listToEdit = useMemo(
    () => lists.find(list => list._id === currentListId),
    [lists, currentListId]
  );

  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(
    () => listToEdit?.title ?? INITIAL_LIST_FORM_STATE.title
  );

  const [selectedCarIds, setSelectedCarIds] = useState<string[]>(
    () => listToEdit?.cars ?? []
  );

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCarSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSelectedCarIds(prev =>
      prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value]
    );
  };

  const buildPayload = () => ({
    user_id: user!._id,
    title,
    cars: selectedCarIds,
  });

  const buildUpdatePayload = () => ({
    title,
    cars: selectedCarIds,
  });

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const payload = buildUpdatePayload();
      await updateList(currentListId, payload);

      handleToggle();
    } catch (err) {
      console.error('Fetch error:', (err as Error).message);
      setError('An error occurred while editing list');
    }
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const payload = buildPayload();
      await createList(payload);

      handleToggle();
    } catch (err) {
      console.error('Fetch error:', (err as Error).message);
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
          value={title}
          onChange={handleTitleChange}
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
            <option key={car._id} value={car._id}>
              {car.name}
            </option>
          ))}
        </select>
      </label>

      {currentListId ? (
        <Button type='submit' onClick={handleEdit}>
          Edit
        </Button>
      ) : (
        <Button type='submit' onClick={handleCreate}>
          Create List
        </Button>
      )}

      {error && <div className='CreateListForm-error'>{error}</div>}
    </form>
  );
};

export default CreateListForm;
