import { useEffect, useState } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';
import { fetchStaff, updateStaff, deleteStaff, BASE_URL } from '../../../services/api';
import { toast } from 'react-toastify';

const StaffList = () => {
  const [searchAll, setSearchAll] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [staff, setStaff] = useState([]);
  const [roles, setRoles] = useState([]);

  const loadData = async () => {
    try {
      const staffData = await fetchStaff();
      setStaff(staffData.data);
      setRoles(['Admin', 'User', 'Manager']);
    } catch (error) {
      console.error('Error fetching staff or roles:', error);
    }
  };

  useEffect(() => {

    loadData();
  }, []);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchAll('');
    setSearchRole('');
    setSearchDate('');
  };

  // Handle Role Update
  const handleRoleChange = async (id, newRole) => {
    try {
      const updatedStaff = await updateStaff(id, { role: newRole });
      setStaff((prevStaff) =>
        prevStaff.map((member) =>
          member.id === id ? { ...member, role: updatedStaff.data.role } : member
        )
      );
      loadData();
      toast.success("Staff role changed.")
    } catch (error) {
      console.error('Error updating role:', error.message);
      toast.error( 'Error updating role.' )
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteStaff(id);
      setStaff((prevStaff) => prevStaff.filter((member) => member._id !== id));
      toast.success("Staff Deleted Successfully.")
    } catch (error) {
      console.error('Error deleting staff:', error.message);
      toast.error( 'Error deleting role.' )
    }
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
        {/* Implement search and filter inputs */}
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
          {staff.slice(0, rowsPerPage).map((member, idx) => (
            <tr key={member._id}>
              <td className="py-2 px-4 border border-gray-200">{idx + 1}</td>
              <td className="py-2 px-4 border border-gray-200">{member.name}</td>
              <td className="py-2 px-4 border border-gray-200">{member.phone}</td>
              <td className="py-2 px-4 border border-gray-200">{member.email}</td>
              <td className="py-2 px-4 border border-gray-200">
                <img src={`${BASE_URL}/${member.image}`} alt={member.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="py-2 px-4 border border-gray-200">
                <select
                  value={member.role}
                  onChange={(e) => handleRoleChange(member._id, e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {roles.map((role, idx) => (
                    <option key={idx} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-4 border border-gray-200">
                {member.permissions.length > 0 ? member.permissions.join(', ') : <span className='font-bold text-red-600'>Not assigned</span>}
              </td> 
              <td className="py-2 px-4 border border-gray-200">{new Date(member.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 border border-gray-200">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => console.log(`Edit ${member.id}`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700" onClick={() => handleDelete(member._id)} > <FaTrashAlt />
                  </button>
                </div>
              </td>
            </tr>))}
        </tbody>
      </table> 
              </div>
            );
};

export default StaffList;


