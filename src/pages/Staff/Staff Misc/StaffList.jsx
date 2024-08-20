import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';

const StaffList = () => {
  const [searchAll, setSearchAll] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'John Doe',
      phoneNumber: '123456789',
      email: 'john.doe@example.com',
      image: 'image1.jpg',
      roles: 'Manager',
      permissions: 'Full Access',
      createdAt: '2024-07-29',
    },
    {
      id: 2,
      name: 'Jane Smith',
      phoneNumber: '987654321',
      email: 'jane.smith@example.com',
      image: 'image2.jpg',
      roles: 'Assistant',
      permissions: 'Limited Access',
      createdAt: '2024-07-30',
    },
    // Add more staff objects as needed
  ]);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchAll('');
    setSearchRole('');
    setSearchDate('');
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Staff List</h2>
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
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Role</label>
          <input
            type="text"
            value={searchRole}
            placeholder="Search Role..."
            onChange={(e) => setSearchRole(e.target.value)}
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Name</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Phone Number</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">E-mail</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Image</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Roles</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Permissions</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Created At</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {staff.slice(0, rowsPerPage).map((member) => (
            <tr key={member.id}>
              <td className="py-2 px-4 border border-gray-200">{member.id}</td>
              <td className="py-2 px-4 border border-gray-200">{member.name}</td>
              <td className="py-2 px-4 border border-gray-200">{member.phoneNumber}</td>
              <td className="py-2 px-4 border border-gray-200">{member.email}</td>
              <td className="py-2 px-4 border border-gray-200"><img src={member.image} alt={member.name} className="w-16 h-16 object-cover"/></td>
              <td className="py-2 px-4 border border-gray-200">{member.roles}</td>
              <td className="py-2 px-4 border border-gray-200">{member.permissions}</td>
              <td className="py-2 px-4 border border-gray-200">{member.createdAt}</td>
              <td className="py-2 px-4 border border-gray-200 ">
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
          Showing 1 to {Math.min(rowsPerPage, staff.length)} of {staff.length} entries
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

export default StaffList;
