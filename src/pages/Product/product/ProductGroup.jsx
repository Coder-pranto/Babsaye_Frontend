

import { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';
import { fetchGroups, fetchGroupById, addGroup, updateGroup, deleteGroup } from '../../../services/api'; // Import your API functions

const ProductGroup = () => {
  const [searchAll, setSearchAll] = useState('');
  const [searchClientGroup, setSearchClientGroup] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editGroupId, setEditGroupId] = useState(null);
  const [groups, setGroups] = useState([]);

  // Fetch groups from API

  const loadGroups = async () => {
    try {
      const response = await fetchGroups();
      setGroups(response.data);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    }
  };
  useEffect(() => {

    loadGroups();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const filteredGroups = groups.filter(group => {
      const matchesSearchAll = group.groupName.toLowerCase().includes(searchAll.toLowerCase());
      const matchesClientGroup = searchClientGroup ? group.groupName.toLowerCase().includes(searchClientGroup.toLowerCase()) : true;
      const matchesDate = searchDate ? group.createdAt === searchDate : true;
      return matchesSearchAll && matchesClientGroup && matchesDate;
    });
    return filteredGroups;
  };

  const handleReset = () => {
    setSearchAll('');
    setSearchClientGroup('');
    setSearchDate('');
  };

  const handleAddGroup = async () => {
    try {
      if (isEditing) {
        // Update the group
        await updateGroup(editGroupId, { groupName: newGroupName });
        setGroups(groups.map(group =>
          group.id === editGroupId ? { ...group, groupName: newGroupName } : group
        ));
        loadGroups();
      } else {
        // Add a new group
        const response = await addGroup({ groupName: newGroupName });
        setGroups([...groups, { id: response.data._id, groupName: newGroupName, createdAt: new Date().toISOString().split('T')[0] }]);
      }
    } catch (error) {
      console.error("Failed to add/update group:", error.message);
    }

    setNewGroupName('');
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetchGroupById(id);
      setNewGroupName(response.data.groupName);
      setEditGroupId(id);
      setIsEditing(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch group for editing:", error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this group?");
    if (confirmed) {
      try {
        await deleteGroup(id);
        setGroups(groups.filter(group => group._id !== id));
      } catch (error) {
        console.error("Failed to delete group:", error.message);
      }
    }
  };

  // Pagination Calculations
  const filteredGroups = handleSearch();
  const totalPages = Math.ceil(filteredGroups.length / rowsPerPage);
  const displayedGroups = filteredGroups.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Product Group</h2>
        <Button
          icon={<FaPlus />}
          text="Add Group"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          onClick={() => {
            setIsEditing(false);
            setNewGroupName('');
            setIsModalOpen(true);
          }}
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
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to first page on rows change
          }}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <label className="ml-2 text-md font-medium text-gray-700">entries</label>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">ID No</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Name</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Created At</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedGroups.map((group) => (
            <tr key={group._id}>
              <td className="py-2 px-4 border border-gray-200">{group._id}</td>
              <td className="py-2 px-4 border border-gray-200">{group.groupName}</td>
              <td className="py-2 px-4 border border-gray-200">{group.createdAt.slice(0,10)}</td>
              <td className="py-2 px-4 border border-gray-200">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(group._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(group._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex space-x-2">
          <Button
            text="Previous"
            bgColor="bg-gray-300 hover:bg-gray-400"
            textColor="text-black"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          />
          <Button
            text="Next"
            bgColor="bg-gray-300 hover:bg-gray-400"
            textColor="text-black"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h3 className="text-xl font-semibold mb-4">{isEditing ? "Edit Group" : "Add New Group"}</h3>
            <input
              type="text"
              value={newGroupName}
              placeholder="Group Name"
              onChange={(e) => setNewGroupName(e.target.value)}
              className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <Button
                text="Cancel"
                bgColor="bg-red-500 hover:bg-red-700"
                textColor="text-white"
                onClick={() => setIsModalOpen(false)}
              />
              <Button
                text={isEditing ? "Save Changes" : "Add Group"}
                bgColor="bg-primary hover:bg-green-700"
                textColor="text-white"
                onClick={handleAddGroup}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGroup;
