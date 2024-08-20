/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';

const PurchaseList = () => {
  const [searchSupplier, setSearchSupplier] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [purchases, setPurchases] = useState([
    {
      id: 1,
      date: '2024-07-29',
      supplier: 'Supplier A',
      product: 'Product 1',
      buying: 200,
      selling: 300,
      quantity: 20,
      total: 4000,
      description: 'Purchase of Product 1 from Supplier A',
    },
    {
      id: 2,
      date: '2024-07-30',
      supplier: 'Supplier B',
      product: 'Product 2',
      buying: 150,
      selling: 250,
      quantity: 30,
      total: 4500,
      description: 'Purchase of Product 2 from Supplier B',
    },
    // Add more purchase objects as needed
  ]);

  const supplierOptions = [
    { id: 1, name: 'Supplier A' },
    { id: 2, name: 'Supplier B' },
    { id: 3, name: 'Supplier C' },
  ];

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchSupplier('');
    setSearchDate('');
  };

  const totalBuying = purchases.reduce((acc, purchase) => acc + purchase.buying, 0);
  const totalSelling = purchases.reduce((acc, purchase) => acc + purchase.selling, 0);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Product Wise Purchase List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          to='/add_new_purchase'
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search by Supplier</label>
          <select
            value={searchSupplier}
            onChange={(e) => setSearchSupplier(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Supplier</option>
            {supplierOptions.map(supplier => (
              <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
            ))}
          </select>
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Date</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Supplier</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Product</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Buying</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Selling</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Quantity</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Total</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
          </tr>
        </thead>
        <tbody>
          {purchases.slice(0, rowsPerPage).map((purchase) => (
            <tr key={purchase.id}>
              <td className="py-2 px-4 border border-gray-200">{purchase.id}</td>
              <td className="py-2 px-4 border border-gray-200">{purchase.date}</td>
              <td className="py-2 px-4 border border-gray-200">{purchase.supplier}</td>
              <td className="py-2 px-4 border border-gray-200">{purchase.product}</td>
              <td className="py-2 px-4 border border-gray-200">{purchase.buying}</td>
              <td className="py-2 px-4 border border-gray-200">{purchase.selling}</td>
              <td className="py-2 px-4 border border-gray-200">{purchase.quantity}</td>
              <td className="py-2 px-4 border border-gray-200">{purchase.total}</td>
              <td className="py-2 px-4 border border-gray-200">{purchase.description}</td>
            </tr>
          ))}
          {/* Totals Row */}
          <tr className="bg-gray-100">
            <td className="py-2 px-4 border border-gray-200" colSpan="4">Total</td>
            <td className="py-2 px-4 border border-gray-200 font-bold">{totalBuying}</td>
            <td className="py-2 px-4 border border-gray-200 font-bold">{totalSelling}</td>
            <td className="py-2 px-4 border border-gray-200" colSpan="3"></td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, purchases.length)} of {purchases.length} entries
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

export default PurchaseList;
