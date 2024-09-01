import { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';
import DepartmentModal from './StaffModal';
import { fetchDepartments, addDepartment, updateDepartment, deleteDepartment } from '../../../services/api';
import { toast } from 'react-toastify';

const StaffDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await fetchDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const openModal = (department = null) => {
    setSelectedDepartment(department);
    setIsEditMode(!!department);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDepartment(null);
    setIsEditMode(false);
    setIsModalOpen(false);
  };

  const handleSaveDepartment = async (department) => {
    try {
      if (isEditMode) {
        await updateDepartment(department._id, department);
        toast.success("Department updated successfully!")
      } else {
        await addDepartment(department);
        toast.success("Department added successfully!")
      }
      loadDepartments();
      closeModal();
    } catch (error) {
      console.error('Error saving department:', error);
      toast.error("Error saving department!")
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await deleteDepartment(id);
      loadDepartments();
      toast.success("Department deleted successfully!")
    } catch (error) {
      console.error('Error deleting department:', error.message);
      toast.error("Error deleting department")
    }
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
            {/* Header section */}
            <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Staff Departments</h2>
        <Button
          icon={<FaPlus />}
          text="Add Department"
          onClick={() => openModal()}
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
        />
      </div>

      {/* Dropdown for number of rows */}
      <div className="flex justify-start mb-8 mt-8">
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
          {departments.length>0 ? departments.slice(0, rowsPerPage).map((department) => (
            <tr key={department._id}>
              <td className="py-2 px-4 border border-gray-200">{department._id}</td>
              <td className="py-2 px-4 border border-gray-200">{department.name}</td>
              <td className="py-2 px-4 border border-gray-200">{department.createdAt.slice(0,10)}</td>
              <td className="py-2 px-4 border border-gray-200">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openModal(department)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteDepartment(department._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </td>
            </tr>
          )):  (
            <tr className="text-center text-gray-400">
              <td colSpan={4} className='p-4'>No data available for preview.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, departments.length)} of {departments.length} entries
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
        <DepartmentModal
          label={"Staff Department"}
          isOpen={isModalOpen}
          isEditMode={isEditMode}
          department={selectedDepartment}
          onSave={handleSaveDepartment}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default StaffDepartment;

