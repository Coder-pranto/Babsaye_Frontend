import { useState, useEffect } from 'react';
import Modal from 'react-modal';

const StaffModal = ({ label, isOpen, isEditMode, department, onSave, onClose }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isEditMode && department) {
      setName(department.name);
    } else {
      setName('');
    }
  }, [isEditMode, department]);

  const handleSave = () => {
    const newDepartment = {
      ...department,
      name,
    };
    onSave(newDepartment);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={isEditMode ? 'Edit' : 'Add'}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit' : 'Add New'}</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 focus:outline-none"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-[#5D5B10] text-white p-2 rounded hover:bg-green-400 focus:outline-none"
          onClick={handleSave}
        >
          {isEditMode ? 'Save Changes' : 'Create'}
        </button>
      </div>
    </Modal>
  );
};

export default StaffModal;
