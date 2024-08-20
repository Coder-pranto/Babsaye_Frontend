import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';
import DesignationModal from './StaffModal';

const StaffDesignation = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [designations, setDesignations] = useState([
    {
      id: 1,
      name: 'Manager',
      createdAt: '2024-07-29',
    },
    {
      id: 2,
      name: 'Accountant',
      createdAt: '2024-07-30',
    },
    // Add more designation objects as needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);

  const openModal = (designation = null) => {
    setSelectedDesignation(designation);
    setIsEditMode(!!designation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDesignation(null);
    setIsEditMode(false);
    setIsModalOpen(false);
  };

  const handleSaveDesignation = (designation) => {
    if (isEditMode) {
      setDesignations(
        designations.map((des) =>
          des.id === designation.id ? { ...des, ...designation } : des
        )
      );
    } else {
      setDesignations([
        ...designations,
        { id: designations.length + 1, ...designation, createdAt: new Date().toISOString().split('T')[0] },
      ]);
    }
    closeModal();
  };

  const handleDeleteDesignation = (id) => {
    setDesignations(designations.filter((des) => des.id !== id));
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Staff Designations</h2>
        <Button
          icon={<FaPlus />}
          text="Add Designation"
          onClick={() => openModal()}
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
        />
      </div>

      {/* Dropdown for number of rows */}
      <div className="flex justify-start mb- mt-8">
        <label className="mx-2 text-md font-medium text-gray-700">Show</label>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <label className="ml-2 text-md font-medium text-gray-700">entries</label>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">ID No</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Name</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Created At</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {designations.slice(0, rowsPerPage).map((designation) => (
            <tr key={designation.id}>
              <td className="py-2 px-4 border border-gray-200">{designation.id}</td>
              <td className="py-2 px-4 border border-gray-200">{designation.name}</td>
              <td className="py-2 px-4 border border-gray-200">{designation.createdAt}</td>
              <td className="py-2 px-4 border border-gray-200 ">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openModal(designation)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteDesignation(designation.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, designations.length)} of {designations.length} entries
        </span>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
            Previous
          </button>
          <span className="text-white bg-blue-500 border-1 p-2 font-semibold rounded-sm">1</span>
          <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
            Next
          </button>
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <DesignationModal
          label={"Staff Designation"}
          isOpen={isModalOpen}
          isEditMode={isEditMode}
          designation={selectedDesignation}
          onSave={handleSaveDesignation}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default StaffDesignation;
