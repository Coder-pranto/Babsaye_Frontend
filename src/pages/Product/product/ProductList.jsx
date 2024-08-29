import { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';
import { fetchProducts, deleteProduct, BASE_URL } from '../../../services/api'; 

const ProductList = () => {
  const [searchAll, setSearchAll] = useState('');
  const [searchClientGroup, setSearchClientGroup] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);


  const loadData = async () => {
    try {
      const { data } = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('There was an error fetching the products!', error.message);
    }
  };

  // Load products when the component mounts
  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = () => {
    // Implement search functionality here
  };
  

  const handleEdit = (id)=>{
    console.log(id);
  }

  // Function to reset the search filters
  const handleReset = () => {
    setSearchAll('');
    setSearchClientGroup('');
    setSearchDate('');
  };


  // Function to handle product deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error('There was an error deleting the product!', error.message);
      }
    }
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Product List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          to='/product_create'
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search All</label>
          <input
            type="text"
            value={searchAll}
            placeholder="Search All..."
            onChange={(e) => setSearchAll(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Client Group</label>
          <input
            type="text"
            value={searchClientGroup}
            placeholder="Search Client Group..."
            onChange={(e) => setSearchClientGroup(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search by Date</label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col justify-center items-center p-4 mt-8">
          <Button
            text="Clear Filter"
            bgColor="bg-slate-800 hover:bg-slate-600"
            textColor="text-white"
            onClick={handleReset}
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Product Name</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Unit</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Brand</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Group</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Image</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Opening Stock</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.slice(0, rowsPerPage).map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border border-gray-200">{product._id}</td>
              <td className="py-2 px-4 border border-gray-200">{product.productName}</td>
              <td className="py-2 px-4 border border-gray-200">{product.unit.unitName}</td>
              <td className="py-2 px-4 border border-gray-200">{product.productBrand.brandName}</td>
              <td className="py-2 px-4 border border-gray-200">{product.productGroup.groupName}</td>
              <td className="py-2 px-4 border border-gray-200">
                <img src={`${BASE_URL}/${product.productImage}`} alt={product.productImage} className="w-16 h-16 object-cover mx-auto" />
              </td>
              <td className="py-2 px-4 border border-gray-200 text-center">{product.openingStock}</td>
              <td className="py-2 px-4 border border-gray-200">
                <div className="flex space-x-2 text-center">
                  <button type="button" className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(product._id)}>
                    <FaEdit />
                  </button>
                  <button type="button" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(product._id)}>
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
          Showing 1 to {Math.min(rowsPerPage, products.length)} of {products.length} entries
        </span>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
            Previous
          </button>
          <span className="text-sm text-gray-700">1</span>
          <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
