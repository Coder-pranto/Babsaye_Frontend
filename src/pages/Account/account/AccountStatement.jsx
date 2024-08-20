import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../../components/Button';

const AccountStatement = () => {
  const [searchClient, setSearchClient] = useState('');
  const [searchAccount, setSearchAccount] = useState('');
  const [searchType, setSearchType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [statements, setStatements] = useState([
    {
      id: 1,
      date: '2024-07-29',
      client: 'John Doe',
      type: 'Deposit',
      account: '1234567890',
      description: 'Monthly deposit',
      credit: 5000,
      debit: 0,
      balance: 5000,
    },
    {
      id: 2,
      date: '2024-07-30',
      client: 'Jane Smith',
      type: 'Cost',
      account: '0987654321',
      description: 'Office supplies',
      credit: 0,
      debit: 1500,
      balance: 3500,
    },
    {
      id: 3,
      date: '2024-07-29',
      client: "Bob marlo",
      type: 'Deposit',
      account: '0987654331',
      description:'office supplies',
      credit:0,
      debit:1800,
      balance:6700,
    },
    {
      id: 4,
      date:'2024-07-28',
      client: "Johnathon Trott",
      type: 'Deposit',
      account:'09877654322',
      description: 'Office supplies',
      credit: 0,
      debit: 2750,
      balance:8800,
    }
    // Add more statement objects as needed
  ]);

  const handleSearch = () => {
    
  };

  const handleReset = () => {
    setSearchClient('');
    setSearchAccount('');
    setSearchType('');
    setStartDate('');
    setEndDate('');
  };

  // Calculate totals
  const totalCredit = statements.reduce((acc, curr) => acc + curr.credit, 0);
  const totalDebit = statements.reduce((acc, curr) => acc + curr.debit, 0);
  const totalBalance = statements.reduce((acc, curr) => acc + curr.balance, 0);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Account Statement</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Client Search</label>
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
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Type</label>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select type</option>
            <option value="Deposit">Deposit</option>
            <option value="Cost">Cost</option>
          </select>
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Client/Supplier</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Type</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Credit</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Debit</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Balance</th>
          </tr>
        </thead>
        <tbody>
          {statements.slice(0, rowsPerPage).map((statement, index) => (
            <tr key={statement.id}>
              <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.date}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.client}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.type}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.account}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.description}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.credit}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.debit}</td>
              <td className="py-2 px-4 border border-gray-200">{statement.balance}</td>
            </tr>
          ))}
          {/* Totals Row */}
          <tr className="font-semibold">
            <td colSpan="6" className="py-2 px-4 border border-gray-200 text-left">Total</td>
            <td className="py-2 px-4 border border-gray-200">{totalCredit}</td>
            <td className="py-2 px-4 border border-gray-200">{totalDebit}</td>
            <td className="py-2 px-4 border border-gray-200">{totalBalance}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, statements.length)} of {statements.length} entries
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

export default AccountStatement;
