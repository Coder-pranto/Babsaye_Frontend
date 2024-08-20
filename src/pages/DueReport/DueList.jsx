import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../components/Button';

const DueList = () => {
  // eslint-disable-next-line no-unused-vars
  const [dues, setDues] = useState([
    {
      id: 1,
      clientInfo: 'John Doe',
      previousDue: 100,
      sales: 200,
      totalBill: 300,
      salesReturn: 20,
      receive: 100,
      moneyReturn: 10,
      due: 90
    },
    {
      id: 2,
      clientInfo: 'Jane Smith',
      previousDue: 150,
      sales: 250,
      totalBill: 400,
      salesReturn: 30,
      receive: 150,
      moneyReturn: 20,
      due: 200
    },
    // Add more dummy data here
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDues = dues.filter(due =>
    due.clientInfo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals
  const totals = filteredDues.reduce((acc, due) => {
    acc.previousDue += due.previousDue;
    acc.sales += due.sales;
    acc.totalBill += due.totalBill;
    acc.salesReturn += due.salesReturn;
    acc.receive += due.receive;
    acc.moneyReturn += due.moneyReturn;
    acc.due += due.due;
    return acc;
  }, {
    previousDue: 0,
    sales: 0,
    totalBill: 0,
    salesReturn: 0,
    receive: 0,
    moneyReturn: 0,
    due: 0
  });

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Due List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          to='/due_create'
        />
      </div>

      {/* Dropdown for number of rows */}
      <div className="flex justify-between my-4">
        <div>
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

        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">SL</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Client Info</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Previous Due</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Sales</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total Bill</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Sales Return</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Receive</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Return</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Due</th>
          </tr>
        </thead>
        <tbody>
          {filteredDues.slice(0, rowsPerPage).map((due, idx) => (
            <tr key={due.id} className="w-full">
              <td className="py-2 px-4 border border-gray-300">{idx + 1}</td>
              <td className="py-2 px-4 border border-gray-300">{due.clientInfo}</td>
              <td className="py-2 px-4 border border-gray-300">{due.previousDue}</td>
              <td className="py-2 px-4 border border-gray-300">{due.sales}</td>
              <td className="py-2 px-4 border border-gray-300">{due.totalBill}</td>
              <td className="py-2 px-4 border border-gray-300">{due.salesReturn}</td>
              <td className="py-2 px-4 border border-gray-300">{due.receive}</td>
              <td className="py-2 px-4 border border-gray-300">{due.moneyReturn}</td>
              <td className="py-2 px-4 border border-gray-300">{due.due}</td>
            </tr>
          ))}
          {/* Total row */}
          <tr className="bg-gray-100">
            <td className="py-2 px-4 border border-gray-300 font-bold" colSpan="2">Total</td>
            <td className="py-2 px-4 border border-gray-300">{totals.previousDue}</td>
            <td className="py-2 px-4 border border-gray-300">{totals.sales}</td>
            <td className="py-2 px-4 border border-gray-300">{totals.totalBill}</td>
            <td className="py-2 px-4 border border-gray-300">{totals.salesReturn}</td>
            <td className="py-2 px-4 border border-gray-300">{totals.receive}</td>
            <td className="py-2 px-4 border border-gray-300">{totals.moneyReturn}</td>
            <td className="py-2 px-4 border border-gray-300">{totals.due}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, filteredDues.length)} of {filteredDues.length} entries
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

export default DueList;
