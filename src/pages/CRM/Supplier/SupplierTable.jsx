import { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { RiArrowDownSFill } from 'react-icons/ri';
import Modal from './Modal';
import moment from 'moment';
import { BASE_URL, updateSupplier, deleteSupplier } from '../../../services/api';
import { toast } from 'react-toastify';

const SupplierTable = ({ suppliers, onSupplierUpdate }) => {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    supplierName: '',
    phone: '',
    address: '',
    companyName: '',
    email: ''
  });

  const handleDropdownToggle = (id) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const handleViewClick = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier);
    setEditFormData({
      supplierName: supplier.supplierName,
      phone: supplier.phone,
      address: supplier.address,
      companyName: supplier.companyName,
      email: supplier.email
    });
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await deleteSupplier(id);
        onSupplierUpdate(); // Refresh the supplier list after deletion
      } catch (error) {
        console.error("Error deleting supplier:", error.message);
      }
    }
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = async () => {
    try {
      await updateSupplier(selectedSupplier._id, editFormData);
      setIsEditing(false);
      setSelectedSupplier(null);
      onSupplierUpdate(); // Refresh the supplier list after updating
      toast.success('Supplier updated successfully', {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Error updating supplier:", error.message);
    }
  };

  const handleCloseModal = () => {
    setSelectedSupplier(null);
    setIsEditing(false);
  };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 border border-gray-300">ID NO</th>
            <th className="py-2 px-4 border border-gray-300">IMAGE</th>
            <th className="py-2 px-4 border border-gray-300">SUPPLIER DETAILS</th>
            <th className="py-2 px-4 border border-gray-300">DETAILS</th>
            <th className="py-2 px-4 border border-gray-300">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, idx) => (
            <tr key={idx} className="w-full">
              <td className="py-2 px-4 border border-gray-300 text-center">{supplier._id.slice(0,8)}</td>
              <td className="py-2 px-4 border border-gray-300">
                <img src={`${BASE_URL}/${supplier.file}`} alt="Supplier" className="w-24 h-24 mx-auto border-2 border-slate-300 rounded-full" />
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <div><strong>Name:</strong> {supplier.supplierName}</div>
                <div><strong>Company:</strong> {supplier.companyName}</div>
                <div><strong>Phone:</strong> {supplier.phone}</div>
                <div><strong>Email:</strong> {supplier.email}</div>
                <div><strong>Address:</strong> {supplier.address}</div>
                <div><strong>Created At:</strong> {moment(supplier.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <table className="min-w-full border border-gray-300">
                  <tbody>
                    <tr>
                      <td className="py-1 px-2 border border-gray-300"><strong>Previous Due:</strong></td>
                      <td className="py-1 px-2 border border-gray-300">{supplier.previousDue}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border border-gray-300"><strong>Total Bill:</strong></td>
                      <td className="py-1 px-2 border border-gray-300">{supplier.totalBill}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border border-gray-300"><strong>Receive:</strong></td>
                      <td className="py-1 px-2 border border-gray-300">{supplier.receive}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border border-gray-300"><strong>Money Return:</strong></td>
                      <td className="py-1 px-2 border border-gray-300">{supplier.moneyReturn}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border border-gray-300"><strong>Due:</strong></td>
                      <td className="py-1 px-2 border border-gray-300">{supplier.due}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="py-2 px-4 border border-gray-300 relative">
                <button
                  className="p-2 mx-auto rounded-sm border border-green-500 bg-[#5d5b10] text-white flex items-center"
                  onClick={() => handleDropdownToggle(supplier.idNo)}
                >
                  Action <RiArrowDownSFill />
                </button>
                {dropdownVisible === supplier.idNo && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    <button
                      className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => handleViewClick(supplier)}
                    >
                      <FaEye className="mr-2" /> View
                    </button>
                    <button
                      className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => handleEditClick(supplier)}
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => handleDeleteClick(supplier._id)}
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedSupplier && (
        <Modal isOpen={!!selectedSupplier} onClose={handleCloseModal}>
          {isEditing ? (
            <div>
              <h3 className="text-lg font-bold mb-4">Edit Supplier</h3>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="supplierName"
                  value={editFormData.supplierName}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={editFormData.companyName}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={editFormData.address}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold mb-4">View Supplier</h3>
              <p><strong>Name:</strong> {selectedSupplier.supplierName}</p>
              <p><strong>Company Name:</strong> {selectedSupplier.companyName}</p>
              <p><strong>Phone Number:</strong> {selectedSupplier.phone}</p>
              <p><strong>Email:</strong> {selectedSupplier.email}</p>
              <p><strong>Address:</strong> {selectedSupplier.address}</p>
              <button
                className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default SupplierTable;
