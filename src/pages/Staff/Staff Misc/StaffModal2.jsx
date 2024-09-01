import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetchDepartments } from '../../../services/api';

 const StaffModal = ({ label, isOpen, isEditMode, designation, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const response = await fetchDepartments();
        setDepartments(response.data);
      } catch (error) {
        console.error('Failed to fetch departments', error);
      }
    };
    loadDepartments();

    if (isEditMode && designation) {
      setTitle(designation.title);
      setDepartmentId(designation.department?._id || '');
    } else {
      setTitle('');
      setDepartmentId('');
    }
  }, [isEditMode, designation]);

  const handleSave = () => {
    const newDesignation = {
      ...designation,
      title,
      department: departmentId,
    };
    onSave(newDesignation);
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Department</label>
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Department</option>
          {departments?.map((dept) => (
            <option key={dept._id} value={dept._id}> {dept.name} </option>))} </select> </div>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEditMode ? 'Update' : 'Save'}
        </button>
      </div>
    </Modal>
  );
};


export default StaffModal;