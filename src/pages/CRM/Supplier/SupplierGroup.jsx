// import { useState } from 'react';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import Button from '../../../components/Button';

// const SupplierGroup = () => {
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [supplierGroups, setSupplierGroups] = useState([]);

//   return (
//     <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
//       {/* Header section */}
//       <div className="flex justify-between items-center bg-[#5D5B10] p-4">
//         <h2 className="text-2xl font-bold text-white">Supplier Group List</h2>
//         <Button
//           icon={<FaPlus />}
//           text="Add New"
//           bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
//           textColor="text-white border border-green-500"
//         />
//       </div>

//       {/* Dropdown for number of rows */}
//       <div className="flex justify-start mb-4 mt-8">
//         <label className="mx-2 text-md font-medium text-gray-700">Show</label>
//         <select
//           value={rowsPerPage}
//           onChange={(e) => setRowsPerPage(Number(e.target.value))}
//           className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value={10}>10</option>
//           <option value={25}>25</option>
//           <option value={50}>50</option>
//           <option value={100}>100</option>
//         </select>
//         <label className="ml-2 text-md font-medium text-gray-700">entries</label>
//       </div>

//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">ID No</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Name</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Created At</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {supplierGroups.slice(0, rowsPerPage).map((group, index) => (
//             <tr key={group.id}>
//               <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
//               <td className="py-2 px-4 border border-gray-200">{group.name}</td>
//               <td className="py-2 px-4 border border-gray-200">{group.createdAt}</td>
//               <td className="py-2 px-4 border border-gray-200">
//                 <button className="text-blue-500 hover:text-blue-700 mx-2">
//                   <FaEdit />
//                 </button>
//                 <button className="text-red-500 hover:text-red-700 mx-2">
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex justify-between items-center mt-6 p-4">
//         <span className="text-gray-700 text-sm">
//           Showing 1 to {Math.min(rowsPerPage, supplierGroups.length)} of {supplierGroups.length} entries
//         </span>
//         <div className="flex items-center space-x-2">
//           <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
//             Previous
//           </button>
//           <span className="text-white bg-blue-500 border-1 p-2 font-semibold rounded-sm">1</span>
//           <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupplierGroup;


import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Button from '../../../components/Button';
import { fetchSupplierGroups, addSupplierGroup, deleteSupplierGroup, updateSupplierGroup } from '../../../services/api';
import { toast } from 'react-toastify';

 const SupplierGroup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [editGroupId, setEditGroupId] = useState(null);

  useEffect(() => {
    const loadGroups = async () => {
      const response = await fetchSupplierGroups();
      console.log(response.data)
      setGroups(response.data);
    };
    loadGroups();
  }, []);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchTerm('');
  };

  const handleAddGroup = () => {
    setShowModal(true);
    setEditGroupId(null);
    setNewGroupName('');
  };

  const handleEditGroup = (id, name) => {
    setShowModal(true);
    setEditGroupId(id);
    setNewGroupName(name);
  };

  const handleDeleteGroup = async (id) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      await deleteSupplierGroup(id);
      setGroups(groups.filter(group => group._id !== id));
      toast.success('Group deleted successfully.');
    }
  };

  const handleSaveGroup = async () => {
    if (editGroupId) {
      try {
        await updateSupplierGroup(editGroupId, { groupName: newGroupName });
        setGroups(groups.map(group => group._id === editGroupId ? { ...group, groupName: newGroupName } : group));
        toast.success('Group name updated successfully.');
      } catch (error) {
        console.error('Failed to update the group:', error.message);
      }
    } else {
      try {
        const response = await addSupplierGroup({ groupName: newGroupName });
        setGroups([...groups, response.data]);
        toast.success("New Group Added!");
      } catch (error) {
        console.error('Failed to add the group:', error.message);
      }
    }
    setNewGroupName('');
    setShowModal(false);
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Supplier Group</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          onClick={handleAddGroup}
        />
      </div>

      {/* Search Functionality */}
      <div className="p-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">Search</label>
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Supplier Group Table */}
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
          {groups.length > 0 ? (
            groups.slice(0, rowsPerPage).map((group) => (
              <tr key={group._id}>
                <td className="py-2 px-4 border border-gray-200">{group._id}</td>
                <td className="py-2 px-4 border border-gray-200">{group.groupName}</td>
                <td className="py-2 px-4 border border-gray-200">{new Date(group.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border border-gray-200">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditGroup(group._id, group.groupName)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteGroup(group._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-2 px-4 border border-gray-200 text-center text-sm text-gray-500">
                No data is available for this table
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {groups.length < rowsPerPage ? groups.length : rowsPerPage} of {groups.length} entries
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

      {/* Modal for Adding/Editing Group */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{editGroupId ? 'Edit Group' : 'Add New Group'}</h2>
            <input
              type="text"
              value={newGroupName}
              placeholder="Group Name"
              onChange={(e) => setNewGroupName(e.target.value)}
              className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button
                text="Cancel"
                bgColor="bg-gray-500 hover:bg-gray-400"
                textColor="text-white"
                onClick={() => setShowModal(false)}
              />
              <Button
                text="Save"
                bgColor="bg-blue-500 hover:bg-blue-400"
                textColor="text-white"
                onClick={handleSaveGroup}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )}
 

  export  default SupplierGroup;