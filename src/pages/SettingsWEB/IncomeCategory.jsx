import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../components/Button';

const IncomeCategory = () => {
  const [searchCategory, setSearchCategory] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Consulting',
      createdAt: '2024-08-01',
    },
    {
      id: 2,
      name: 'Sales',
      createdAt: '2024-08-02',
    },
    // Add more categories as needed
  ]);

  const handleSearch = () => {
    return searchCategory
      ? data.filter((item) =>
          item.name.toLowerCase().includes(searchCategory.toLowerCase())
        )
      : data;
  };

  const handleAddCategory = () => {
    if (editMode) {
      setData(
        data.map((item) =>
          item.id === currentCategoryId ? { ...item, name: newCategory } : item
        )
      );
    } else {
      const newCategoryData = {
        id: data.length + 1,
        name: newCategory,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setData([...data, newCategoryData]);
    }
    setNewCategory('');
    setModalOpen(false);
    setEditMode(false);
  };

  const handleEdit = (id, name) => {
    setNewCategory(name);
    setCurrentCategoryId(id);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const filteredData = handleSearch();

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Income Categories</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          onClick={() => {
            setModalOpen(true);
            setNewCategory('');
            setEditMode(false);
          }}
        />
      </div>

      {/* Search Portion */}
      <div className="p-4 mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Search By Category Name
        </label>
        <input
          type="text"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          placeholder="Enter category name"
          className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">ID No</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Name</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Created At</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="w-full">
              <td className="py-2 px-4 border border-gray-300">{item.id}</td>
              <td className="py-2 px-4 border border-gray-300">{item.name}</td>
              <td className="py-2 px-4 border border-gray-300">{item.createdAt}</td>
              <td className="py-2 px-4 border border-gray-300">
                <button
                  onClick={() => handleEdit(item.id, item.name)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">
              {editMode ? 'Edit Category' : 'Add New Category'}
            </h3>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className="input w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddCategory}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                {editMode ? 'Update' : 'Add'}
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeCategory;
