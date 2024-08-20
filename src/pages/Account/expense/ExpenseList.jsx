import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../../components/Button';

const ExpenseList = () => {
  const [searchCategory, setSearchCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: '2024-07-29',
      idNo: '001',
      category: 'Office Supplies',
      account: 'Account 1',
      chequeNo: 'CHE001',
      description: 'Purchase of office chairs',
      transactionType: 'Debit',
      amount: 2500,
      printable: 'Yes',
    },
    {
      id: 2,
      date: '2024-07-30',
      idNo: '002',
      category: 'Travel',
      account: 'Account 2',
      chequeNo: 'CHE002',
      description: 'Business trip to client',
      transactionType: 'Credit',
      amount: 1200,
      printable: 'No',
    },
    // Add more expense objects as needed
  ]);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchCategory('');
    setStartDate('');
    setEndDate('');
  };

  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Expense List</h2>
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
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Category</label>
          <div className="flex items-center">
            <input
              type="text"
              value={searchCategory}
              placeholder="Search Category..."
              onChange={(e) => setSearchCategory(e.target.value)}
              className="input flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button
              onClick={handleSearch}
              className="btn bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
            >
              Search
            </button>
          </div>
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
          {expenses.slice(0, rowsPerPage).map((expense, index) => (
            <tr key={expense.id}>
              <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-200">{expense.date}</td>
              <td className="py-2 px-4 border border-gray-200">{expense.idNo}</td>
              <td className="py-2 px-4 border border-gray-200">{expense.category}</td>
              <td className="py-2 px-4 border border-gray-200">{expense.account}</td>
              <td className="py-2 px-4 border border-gray-200">{expense.chequeNo}</td>
              <td className="py-2 px-4 border border-gray-200">{expense.description}</td>
              <td className="py-2 px-4 border border-gray-200">{expense.transactionType}</td>
              <td className="py-2 px-4 border border-gray-200">{expense.amount}</td>
              <td className="py-2 px-4 border border-gray-200">{expense.printable}</td>
              <td className="py-2 px-4 border border-gray-200">
                {/* Add action buttons or links here */}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="8" className="py-2 px-4 border border-gray-200 font-semibold text-right">Total</td>
            <td className="py-2 px-4 border border-gray-200 font-semibold">{totalAmount}</td>
            <td colSpan="2" className="py-2 px-4 border border-gray-200"></td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, expenses.length)} of {expenses.length} entries
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

export default ExpenseList;