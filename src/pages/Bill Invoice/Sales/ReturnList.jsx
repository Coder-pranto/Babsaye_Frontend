import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../../components/Button';

const ReturnList = () => {
  const [searchClient, setSearchClient] = useState('');
  const [searchAccount, setSearchAccount] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [returns, setReturns] = useState([
    {
      id: 1,
      client: 'John Doe',
      invoiceId: 'INV-001',
      category: 'Electronics',
      returnQuantity: 1,
      billAmount: 2000,
      discount: 100,
      receiveAmount: 1900,
      dueAmount: 100,
      createdAt: '2024-07-29',
      type: 'Return',
    },
    {
      id: 2,
      client: 'Jane Smith',
      invoiceId: 'INV-002',
      category: 'Office Supplies',
      returnQuantity: 2,
      billAmount: 1500,
      discount: 0,
      receiveAmount: 1500,
      dueAmount: 0,
      createdAt: '2024-07-30',
      type: 'Return',
    },
    // Add more return objects as needed
  ]);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchClient('');
    setSearchAccount('');
  };

  // Calculate totals
  const totalBillAmount = returns.reduce((acc, curr) => acc + curr.billAmount, 0);
  const totalDiscount = returns.reduce((acc, curr) => acc + curr.discount, 0);
  const totalReceiveAmount = returns.reduce((acc, curr) => acc + curr.receiveAmount, 0);
  const totalDueAmount = returns.reduce((acc, curr) => acc + curr.dueAmount, 0);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Return List</h2>
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
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Client</label>
          <input
            type="text"
            value={searchClient}
            placeholder="Search Client..."
            onChange={(e) => setSearchClient(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Account</label>
          <input
            type="text"
            value={searchAccount}
            placeholder="Search Account..."
            onChange={(e) => setSearchAccount(e.target.value)}
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">SL</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Client</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Invoice ID No</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Category</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Return Quantity</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Bill Amount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Discount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Receive Amount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Due Amount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Created At</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Type</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Printable</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {returns.slice(0, rowsPerPage).map((returnItem, index) => (
            <tr key={returnItem.id}>
              <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-200">{returnItem.client}</td>
              <td className="py-2 px-4 border border-gray-200">{returnItem.invoiceId}</td>
              <td className="py-2 px-4 border border-gray-200">{returnItem.category}</td>
              <td className="py-2 px-4 border border-gray-200">{returnItem.returnQuantity}</td>
              <td className="py-2 px-4 border border-gray-200">{returnItem.billAmount}</td>
              <td className="py-2 px-4 border border-gray-200">{returnItem.discount}</td>
              <td className="py-2 px-4 border border-gray-200">{returnItem.receiveAmount}</td>
              <td className="py-2 px-4 border border-gray-200">{returnItem.dueAmount}</td>
              <td className="py-2 px-4 border border-gray-200">{returnItem.createdAt}</td>
              <td className="py-2 px-4 border border-gray-200">{returnItem.type}</td>
              <td className="py-2 px-4 border border-gray-200">Printable</td>
              <td className="py-2 px-4 border border-gray-200">Action</td>
            </tr>
          ))}
          {/* Totals Row */}
          <tr className="font-semibold">
            <td colSpan="5" className="py-2 px-4 border border-gray-200 text-left">Total</td>
            <td className="py-2 px-4 border border-gray-200">{totalBillAmount}</td>
            <td className="py-2 px-4 border border-gray-200">{totalDiscount}</td>
            <td className="py-2 px-4 border border-gray-200">{totalReceiveAmount}</td>
            <td className="py-2 px-4 border border-gray-200">{totalDueAmount}</td>
            <td colSpan="4" className="py-2 px-4 border border-gray-200"></td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, returns.length)} of {returns.length} entries
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

export default ReturnList;
