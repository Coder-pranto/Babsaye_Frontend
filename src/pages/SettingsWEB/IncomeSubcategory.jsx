import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../components/Button';
import {
  fetchSubcategories,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
  fetchCategories
} from '../../services/api'; 
import { toast } from 'react-toastify';

const IncomeSubcategory = () => {
  const [searchSubcategory, setSearchSubcategory] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentSubcategoryId, setCurrentSubcategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadSubcategories();
    loadCategories();
  }, [modalOpen]);

  const loadSubcategories = async () => {
    try {
      const response = await fetchSubcategories();
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSearch = () => {
    return searchSubcategory
      ? data.filter((item) =>
          item.name.toLowerCase().includes(searchSubcategory.toLowerCase())
        )
      : data;
  };

  const handleAddSubcategory = async () => {
    try {
      if (editMode) {
        await updateSubcategory(currentSubcategoryId, {
          name: newSubcategory,
          category: selectedCategory,
        });
        setData(
          data.map((item) =>
            item._id === currentSubcategoryId
              ? { ...item, name: newSubcategory, category: selectedCategory }
              : item
          )
        );
        toast.success('Subcategory updated successfully!');
      } else {
        console.log(newSubcategory, selectedCategory);
        const response = await addSubcategory({
          name: newSubcategory,
          category: selectedCategory,
        });
        setData([...data, response.data]);
        toast.success('New subcategory added!');
      }
      setNewSubcategory('');
      setSelectedCategory('');
      setModalOpen(false);
      setEditMode(false);
    } catch (error) {
      console.error('Failed to add/update subcategory:', error.message);
      toast.error('Failed to add/update subcategory');
    }
  };

  const handleEdit = (id, name, category) => {
    console.log()
    setNewSubcategory(name);
    setSelectedCategory(category);
    setCurrentSubcategoryId(id);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this subcategory?'
    );
    if (confirmed) {
      try {
        await deleteSubcategory(id);
        setData(data.filter((item) => item._id !== id));
        toast.success('Subcategory deleted successfully!');
      } catch (error) {
        console.error('Failed to delete subcategory:', error.message);
        toast.error('Failed to delete subcategory');
      }
    }
  };

  const filteredData = handleSearch();

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Income Subcategories</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          onClick={() => {
            setModalOpen(true);
            setNewSubcategory('');
            setSelectedCategory('');
            setEditMode(false);
          }}
        />
      </div>

      {/* Search Portion */}
      <div className="p-4 mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Search By Subcategory Name
        </label>
        <input
          type="text"
          value={searchSubcategory}
          onChange={(e) => setSearchSubcategory(e.target.value)}
          placeholder="Enter subcategory name"
          className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">ID No</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Category</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Name</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Created At</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item._id} className="w-full">
                <td className="py-2 px-4 border border-gray-300">{item._id}</td>
                <td className="py-2 px-4 border border-gray-300">{item.category.name}</td>
                <td className="py-2 px-4 border border-gray-300">{item.name}</td>
                <td className="py-2 px-4 border border-gray-300">
                  {item.createdAt.split('T')[0]}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  <button
                    onClick={() => handleEdit(item._id, item.name, item.category)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="py-4 px-4 border border-gray-300 text-center text-gray-500"
              >
                No subcategories available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add/Edit Subcategory Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">
              {editMode ? 'Edit Subcategory' : 'Add New Subcategory'}
            </h3>
            <select
              value={selectedCategory._id}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name} 
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
              placeholder="Enter subcategory name"
              className="input w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddSubcategory}
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

export default IncomeSubcategory;
