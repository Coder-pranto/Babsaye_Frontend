import { useState } from 'react';
import { FaSearch, FaPrint, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';

const StaffPaymentReport = () => {
  const [searchClient, setSearchClient] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [payments, setPayments] = useState([
    {
      id: 1,
      date: '2024-07-29',
      clientId: '123',
      category: 'Salary',
      account: '123456',
      chequeNo: '7890',
      description: 'Monthly Salary',
      transactionType: 'Credit',
      amount: '5000',
    },
    {
      id: 2,
      date: '2024-07-30',
      clientId: '456',
      category: 'Bonus',
      account: '654321',
      chequeNo: '1234',
      description: 'Performance Bonus',
      transactionType: 'Credit',
      amount: '1000',
    },
    // Add more payment objects as needed
  ]);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchClient('');
    setSearchDate('');
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Staff Payment Report</h2>
        <Button
          icon={<FaSearch />}
          text="Search"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          onClick={handleSearch}
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search by Client</label>
          <input
            type="text"
            value={searchClient}
            placeholder="Search Client..."
            onChange={(e) => setSearchClient(e.target.value)}
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">SL</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Date</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">ID No</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Category</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Cheque No</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Transaction Type</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Amount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Printable</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.slice(0, rowsPerPage).map((payment, index) => (
            <tr key={payment.id}>
              <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.date}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.clientId}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.category}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.account}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.chequeNo}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.description}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.transactionType}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.amount}</td>
              <td className="py-2 px-4 border border-gray-200">
                <button type="button" className="text-green-500 hover:text-green-700">
                  <FaPrint />
                </button>
              </td>
              <td className="py-2 px-4 border border-gray-200">
                <div className="flex space-x-2">
                  <button type="button" className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button type="button" className="text-red-500 hover:text-red-700">
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
          Showing 1 to {Math.min(rowsPerPage, payments.length)} of {payments.length} entries
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

export default StaffPaymentReport;
