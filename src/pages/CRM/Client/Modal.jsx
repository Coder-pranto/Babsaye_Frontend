import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
          <FaTimes size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
