import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../../components/Button';
import { fetchProducts } from '../../../services/api';

const ProductStock = () => {
  const [searchAll, setSearchAll] = useState('');
  const [searchClientGroup, setSearchClientGroup] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts();
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchAll('');
    setSearchClientGroup('');
    setSearchDate('');
  };

  // Calculate total buying and selling prices
  const totalBuyingPrice = products.reduce((acc, product) => acc + product.buyingPrice, 0);
  const totalSellingPrice = products.reduce((acc, product) => acc + product.sellingPrice, 0);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Product Stock</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Product</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Group</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Opening Stock</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Stock</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Carton</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Buying Price</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Selling Price</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Profit %</th>
          </tr>
        </thead>
        <tbody>
          {products.slice(0, rowsPerPage).map((product) => {
            const profitPercentage = ((product.sellingPrice - product.buyingPrice) / product.buyingPrice) * 100;
            return (
              <tr key={product._id}>
                <td className="py-2 px-4 border border-gray-200">{product._id}</td>
                <td className="py-2 px-4 border border-gray-200">{product.productName}</td>
                <td className="py-2 px-4 border border-gray-200">{product.productGroup.groupName}</td>
                <td className="py-2 px-4 border border-gray-200">{product.openingStock}</td>
                <td className="py-2 px-4 border border-gray-200">{product.openingStock}</td>
                <td className="py-2 px-4 border border-gray-200">{product.carton}</td>
                <td className="py-2 px-4 border border-gray-200">{product.buyingPrice}</td>
                <td className="py-2 px-4 border border-gray-200">{product.sellingPrice}</td>
                <td className="py-2 px-4 border border-gray-200">{profitPercentage.toFixed(2)}%</td>
              </tr>
            );
          })}
          {/* Totals Row */}
          <tr className="bg-gray-100">
            <td className="py-2 px-4 border border-gray-200" colSpan="7">Total</td>
            <td className="py-2 px-4 border border-gray-200 font-bold">{totalBuyingPrice}</td>
            <td className="py-2 px-4 border border-gray-200 font-bold">{totalSellingPrice}</td>
          </tr>
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
          <span className="text-white bg-blue-500 border-1 p-2 font-semibold rounded-sm">1</span>
          <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};



export default ProductStock;

