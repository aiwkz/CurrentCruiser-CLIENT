import BookForm from '@/components/BookForm/BookForm';
import Button from '@/components/Button/Button';

import './Modal.css';

const Modal = ({ isOpen, toggleModal }) => (
  <>
    {isOpen && (
      <div className='Modal-div-overlay' onClick={toggleModal}>
        <div className='Modal-div-content' onClick={(e) => e.stopPropagation()}>
          <Button className='Modal-button-close' onClick={toggleModal}>
            X
          </Button>
          <div className='Modal-div-body'>
            <BookForm toggleModal={toggleModal} />
          </div>
        </div>
      </div>
    )}
  </>
);

export default Modal;
