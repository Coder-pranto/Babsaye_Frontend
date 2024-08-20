import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../components/Button';

const GroupWise = () => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      groupName: 'Corporate Clients',
      totalDue: 1000,
      totalSales: 5000,
      totalBill: 6000,
      totalReturn: 500,
      totalReceived: 4500,
      totalOutstanding: 1000
    },
    {
      id: 2,
      groupName: 'Retail Clients',
      totalDue: 1500,
      totalSales: 7000,
      totalBill: 8500,
      totalReturn: 700,
      totalReceived: 6000,
      totalOutstanding: 1500
    },
    // Add more dummy data here
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredGroups = groups.filter(group =>
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals
  const totals = filteredGroups.reduce((acc, group) => {
    acc.totalDue += group.totalDue;
    acc.totalSales += group.totalSales;
    acc.totalBill += group.totalBill;
    acc.totalReturn += group.totalReturn;
    acc.totalReceived += group.totalReceived;
    acc.totalOutstanding += group.totalOutstanding;
    return acc;
  }, {
    totalDue: 0,
    totalSales: 0,
    totalBill: 0,
    totalReturn: 0,
    totalReceived: 0,
    totalOutstanding: 0
  });

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Group Wise List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          to='/group_create'
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
            placeholder="Search by Client Group..."
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
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Client Group</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total Due</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total Sales</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total Bill</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total Return</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total Received</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total Outstanding</th>
          </tr>
        </thead>
        <tbody>
          {filteredGroups.slice(0, rowsPerPage).map((group, idx) => (
            <tr key={group.id} className="w-full">
              <td className="py-2 px-4 border border-gray-300">{idx + 1}</td>
              <td className="py-2 px-4 border border-gray-300">{group.groupName}</td>
              <td className="py-2 px-4 border border-gray-300">{group.totalDue}</td>
              <td className="py-2 px-4 border border-gray-300">{group.totalSales}</td>
              <td className="py-2 px-4 border border-gray-300">{group.totalBill}</td>
              <td className="py-2 px-4 border border-gray-300">{group.totalReturn}</td>
              <td className="py-2 px-4 border border-gray-300">{group.totalReceived}</td>
              <td className="py-2 px-4 border border-gray-300">{group.totalOutstanding}</td>
            </tr>
          ))}
          {/* Total row */}
          <tr className="bg-gray-100">
            <td className="py-2 px-4 border border-gray-300 font-bold" colSpan="2">Total</td>
            <td className="py-2 px-4 border border-gray-300">{totals.totalDue}</td>
            <td className="py-2 px-4 border border-gray-300">{totals.totalSales}</td>
            <td className="py-2 px-4 border border-gray-300">{totals.totalBill}</td>
            <td className="py-2 px-4 border border-gray-300">{totals.totalReturn}</td>
            <td className="py-2 px-4 border border-gray-300">{totals.totalReceived}</td>
            <td className="py-2 px-4 border border-gray-300">{totals.totalOutstanding}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, filteredGroups.length)} of {filteredGroups.length} entries
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

export default GroupWise;
