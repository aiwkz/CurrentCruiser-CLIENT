import BookForm from '@/components/BookForm/BookForm';

import './Modal.css';

const Modal = ({ isOpen, toggleModal }) => (
  <>
    {isOpen && (
      <div className='Modal-div-overlay' onClick={toggleModal}>
        <div className='Modal-div-content' onClick={(e) => e.stopPropagation()}>
          <button className='Modal-button-close' onClick={toggleModal}>
            X
          </button>
          <div className='Modal-div-body'>
            <BookForm toggleModal={toggleModal} />
          </div>
        </div>
      </div>
    )}
  </>
);

export default Modal;
