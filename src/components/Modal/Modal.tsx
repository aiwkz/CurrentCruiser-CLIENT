import CreateListForm from '@/components/CreateListForm/CreateListForm';

import { useListsStore } from '@/stores/listsStore';

import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const Modal = ({ isOpen, toggleModal }: ModalProps): JSX.Element => {
  const currentListId = useListsStore(state => state.currentListId);

  return (
    <>
      {isOpen && (
        <div className='Modal-overlay' onClick={toggleModal}>
          <div className='Modal-content' onClick={e => e.stopPropagation()}>
            <button className='Modal-button-close' onClick={toggleModal}>
              X
            </button>
            <div className='Modal-body'>
              <CreateListForm
                key={currentListId ?? 'new'}
                toggleModal={toggleModal}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
