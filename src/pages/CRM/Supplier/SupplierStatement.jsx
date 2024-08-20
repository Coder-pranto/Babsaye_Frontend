import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../../components/Button';

const SupplierStatement = () => {
  const [searchSupplier, setSearchSupplier] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [statements, setStatements] = useState([
    {
      id: 1,
      date: '2024-07-29',
      product: 'Product 1',
      unit: 'kg',
      qty: 10,
      price: 50,
      totalBuying: 500,
      dis: 10,
      grandTotal: 490,
      payment: 490,
      due: 0,
    },
    {
      id: 2,
      date: '2024-07-30',
      product: 'Product 2',
      unit: 'liters',
      qty: 5,
      price: 100,
      totalBuying: 500,
      dis: 0,
      grandTotal: 500,
      payment: 300,
      due: 200,
    },
    // Add more statement objects as needed
  ]);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchSupplier('');
    setStartDate('');
    setEndDate('');
  };

  const filteredStatements = statements.filter(statement => {
    const matchesSupplier = searchSupplier ? statement.product.toLowerCase().includes(searchSupplier.toLowerCase()) : true;
    const matchesStartDate = startDate ? new Date(statement.date) >= new Date(startDate) : true;
    const matchesEndDate = endDate ? new Date(statement.date) <= new Date(endDate) : true;

    return matchesSupplier && matchesStartDate && matchesEndDate;
  });

  const calculateTotal = (key) => {
    return filteredStatements.reduce((total, statement) => total + statement[key], 0);
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Supplier Statement</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search By Supplier</label>
          <input
            type="text"
            value={searchSupplier}
            placeholder="Search by supplier..."
            onChange={(e) => setSearchSupplier(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search By Date</label>
          <div className="flex space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Product</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Unit</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">QTY</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Price</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Total Buying</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">DIS</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Grand Total</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Payment</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Due</th>
          </tr>
        </thead>
        <tbody>
          {filteredStatements.slice(0, rowsPerPage).map((statement, index) => (
            <tr key={statement.id}>
              <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.date}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.product}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.unit}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.qty}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.price}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.totalBuying}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.dis}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.grandTotal}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.payment}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.due}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="py-2 px-4 border border-gray-200" colSpan={4}>Total</td>
            <td className="py-2 px-4 border border-gray-200">{calculateTotal('qty')}</td>
            <td className="py-2 px-4 border border-gray-200">{calculateTotal('price')}</td>
            <td className="py-2 px-4 border border-gray-200">{calculateTotal('totalBuying')}</td>
            <td className="py-2 px-4 border border-gray-200">{calculateTotal('dis')}</td>
            <td className="py-2 px-4 border border-gray-200">{calculateTotal('grandTotal')}</td>
            <td className="py-2 px-4 border border-gray-200">{calculateTotal('payment')}</td>
            <td className="py-2 px-4 border border-gray-200">{calculateTotal('due')}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, filteredStatements.length)} of {filteredStatements.length} entries
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

export default SupplierStatement;
