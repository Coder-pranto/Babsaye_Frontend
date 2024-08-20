import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';

const ProductBrand = () => {
  const [searchAll, setSearchAll] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editBrandId, setEditBrandId] = useState(null);

  const [brands, setBrands] = useState([
    {
      id: 1,
      unit: 'Brand 1',
      createdAt: '2024-07-29',
    },
    {
      id: 2,
      unit: 'Brand 2',
      createdAt: '2024-07-30',
    },
    // Add more brand objects as needed
  ]);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleAddOrEditBrand = () => {
    if (isEditing) {
      // Edit the existing brand
      setBrands(brands.map(brand =>
        brand.id === editBrandId ? { ...brand, unit: newBrandName } : brand
      ));
    } else {
      // Add a new brand
      setBrands([
        ...brands,
        { id: brands.length + 1, unit: newBrandName, createdAt: new Date().toISOString().split('T')[0] },
      ]);
    }

    setNewBrandName('');
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleEdit = (id) => {
    const brand = brands.find(brand => brand.id === id);
    setNewBrandName(brand.unit);
    setEditBrandId(id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this brand?");
    if (confirmed) {
      setBrands(brands.filter(brand => brand.id !== id));
    }
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Product Brand</h2>
        <Button
          icon={<FaPlus />}
          text="Add Brand"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          onClick={() => {
            setIsEditing(false);
            setNewBrandName('');
            setIsModalOpen(true);
          }}
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <div className="p-4 col-span-1">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search All</label>
          <input
            type="text"
            value={searchAll}
            placeholder="Search All..."
            onChange={(e) => setSearchAll(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Dropdown for number of rows */}
      <div className="flex justify-start mb-4">
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
          {brands.slice(0, rowsPerPage).map((brand) => (
            <tr key={brand.id}>
              <td className="py-2 px-4 border border-gray-200">{brand.id}</td>
              <td className="py-2 px-4 border border-gray-200">{brand.unit}</td>
              <td className="py-2 px-4 border border-gray-200">{brand.createdAt}</td>
              <td className="py-2 px-4 border border-gray-200">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(brand.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(brand.id)}
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
          Showing 1 to {Math.min(rowsPerPage, brands.length)} of {brands.length} entries
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-4">{isEditing ? "Edit Brand" : "Add New Brand"}</h3>
            <input
              type="text"
              value={newBrandName}
              placeholder="Brand Name"
              onChange={(e) => setNewBrandName(e.target.value)}
              className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <Button
                text="Cancel"
                bgColor="bg-red-500 hover:bg-red-700"
                textColor="text-white"
                onClick={() => setIsModalOpen(false)}
              />
              <Button
                text={isEditing ? "Save Changes" : "Add Brand"}
                bgColor="bg-green-500 hover:bg-green-700"
                textColor="text-white"
                onClick={handleAddOrEditBrand}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductBrand;
