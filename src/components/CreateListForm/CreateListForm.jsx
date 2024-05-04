import { useContext, useState, useEffect } from 'react';

import { CarsContext } from '@/contexts/carsContext';
import { ListsContext } from '@/contexts/listsContext';
import { AuthContext } from '@/contexts/authContext';
import Button from '@/components/Button/Button';
import { INITIAL_CREATE_LIST_FORM_STATE } from '@/constants/constants';

import './CreateListForm.css';

const CreateListForm = ({ toggleModal }) => {
  const { cars } = useContext(CarsContext);
  const { currentlistId, createList, lists, updateList, setLists } = useContext(ListsContext);
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [selectedCarIds, setSelectedCarIds] = useState([]);
  const listToEdit = lists.find(list => list._id === currentlistId);
  const [formData, setFormData] = useState(listToEdit ? listToEdit : INITIAL_CREATE_LIST_FORM_STATE);

  useEffect(() => {
    if (listToEdit) {
      // If editing a list, initialize selectedCarIds with the IDs of cars in the list
      setSelectedCarIds(listToEdit.cars);
    }
  }, [listToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCarSelect = (e) => {
    const { value } = e.target;

    const updatedSelectedCarIds = selectedCarIds.includes(value)
      ? selectedCarIds.filter(id => id !== value)
      : [...selectedCarIds, value];
    setSelectedCarIds(updatedSelectedCarIds);

    setFormData({
      ...formData,
      user_id: user._id,
      cars: updatedSelectedCarIds
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await updateList(currentlistId, formData);
      setLists(lists.map(list => (list._id === currentlistId ? formData : list)));
      toggleModal();
      setFormData(INITIAL_CREATE_LIST_FORM_STATE);
      setSelectedCarIds([]);
    } catch (error) {
      console.error('Fetch error:', error.message);
      setError('An error occurred while editing list');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createList(formData);
      toggleModal();
      setFormData(INITIAL_CREATE_LIST_FORM_STATE);
      setSelectedCarIds([]);
    } catch (error) {
      console.error('Fetch error:', error.message);
      setError('An error occurred while creating list');
    }
  };

  return (
    <form className='CreateListForm'>
      <label className='CreateListForm-input'>
        <h3>List Title</h3>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label className='CreateListForm-input'>
        <h3>Select Cars</h3>
        <select
          name="cars"
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
      {
        currentlistId
          ? (
            <Button type='submit' onClick={handleEdit}>Edit</Button>
          )
          : <Button type='submit' onClick={handleCreate}>Create List</Button>
      }

    </form>
  );
};

export default CreateListForm;
