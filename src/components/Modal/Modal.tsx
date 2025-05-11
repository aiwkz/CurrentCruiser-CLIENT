import CreateListForm from '@/components/CreateListForm/CreateListForm';

import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    toggleModal: () => void;
}

const Modal = ({ isOpen, toggleModal }: ModalProps): JSX.Element => (
    <>
        {isOpen && (
            <div
                className='Modal-overlay'
                onClick={toggleModal}
            >
                <div
                    className='Modal-content'
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        className='Modal-button-close'
                        onClick={toggleModal}
                    >
                        X
                    </button>
                    <div className='Modal-body'>
                        <CreateListForm toggleModal={toggleModal} />
                    </div>
                </div>
            </div>
        )}
    </>
);

export default Modal;
