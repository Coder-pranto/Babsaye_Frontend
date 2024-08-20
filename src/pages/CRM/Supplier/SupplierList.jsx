// import { useState } from 'react';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import Button from '../../../components/Button';

// const SupplierList = () => {
//   const [searchGroup, setSearchGroup] = useState('');
//   const [searchAll, setSearchAll] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [suppliers, setSuppliers] = useState([
//     {
//       id: 1,
//       image: './supplier1.png',
//       name: 'Supplier 1',
//       phone: '123-456-7890',
//       address: '123 Supplier St.',
//       account: 'Account 1',
//       group: 'Group 1',
//       date: '2024-07-29',
//     },
//     {
//       id: 2,
//       image: './supplier2.png',
//       name: 'Supplier 2',
//       phone: '098-765-4321',
//       address: '456 Supplier Ave.',
//       account: 'Account 2',
//       group: 'Group 2',
//       date: '2024-07-30',
//     },
//     // Add more supplier objects as needed
//   ]);

//   const handleSearch = () => {
//     // Implement search functionality here
//   };

//   const handleReset = () => {
//     setSearchGroup('');
//     setSearchAll('');
//     setStartDate('');
//     setEndDate('');
//   };

//   const filteredSuppliers = suppliers.filter(supplier => {
//     const matchesGroup = searchGroup ? supplier.group === searchGroup : true;
//     const matchesSearchAll = searchAll
//       ? Object.values(supplier).some(value => 
//           value.toString().toLowerCase().includes(searchAll.toLowerCase())
//         )
//       : true;
//     const matchesStartDate = startDate ? new Date(supplier.date) >= new Date(startDate) : true;
//     const matchesEndDate = endDate ? new Date(supplier.date) <= new Date(endDate) : true;

//     return matchesGroup && matchesSearchAll && matchesStartDate && matchesEndDate;
//   });

//   return (
//     <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
//       {/* Header section */}
//       <div className="flex justify-between items-center bg-[#5D5B10] p-4">
//         <h2 className="text-2xl font-bold text-white">Supplier List</h2>
//         <Button
//           icon={<FaPlus />}
//           text="Add New"
//           bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
//           textColor="text-white border border-green-500"
//         />
//       </div>

//       {/* Filter Portion */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//         <div className="p-4">
//           <label className="block text-lg font-medium text-gray-700 mb-2">Search All</label>
//           <input
//             type="text"
//             value={searchAll}
//             placeholder="Search..."
//             onChange={(e) => setSearchAll(e.target.value)}
//             className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div className="p-4">
//           <label className="block text-lg font-medium text-gray-700 mb-2">Search By Supplier Group</label>
//           <select
//             value={searchGroup}
//             onChange={(e) => setSearchGroup(e.target.value)}
//             className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Select Group...</option>
//             <option value="Group 1">Group 1</option>
//             <option value="Group 2">Group 2</option>
//             {/* Add more groups as needed */}
//           </select>
//         </div>
//         <div className="p-4">
//           <label className="block text-lg font-medium text-gray-700 mb-2">Search By Date</label>
//           <div className="flex space-x-2">
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//         <div className="flex flex-col justify-center items-center p-4 mt-8">
//           <Button
//             text="Clear Filter"
//             bgColor="bg-slate-800 hover:bg-slate-600"
//             textColor="text-white"
//             onClick={handleReset}
//           />
//         </div>
//       </div>

//       {/* Dropdown for number of rows */}
//       <div className="flex justify-start mb-4">
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
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Image</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Supplier Details</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredSuppliers.slice(0, rowsPerPage).map((supplier, index) => (
//             <tr key={supplier.id}>
//               <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
//               <td className="py-2 px-4 border border-gray-200">
//                 <img src={supplier.image} alt="Supplier" className="w-24 h-24 mx-auto border-2 border-slate-300 rounded-full" />
//               </td>
//               <td className="py-2 px-4 border border-gray-200">
//                 <div><strong>Name:</strong> {supplier.name}</div>
//                 <div><strong>Phone:</strong> {supplier.phone}</div>
//                 <div><strong>Address:</strong> {supplier.address}</div>
//               </td>
//               <td className="py-2 px-4 border border-gray-200">{supplier.account}</td>
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
//           Showing 1 to {Math.min(rowsPerPage, filteredSuppliers.length)} of {filteredSuppliers.length} entries
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

// export default SupplierList;


import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../../components/Button';
import SupplierTable from './SupplierTable';
import {
  fetchSuppliers,
  fetchSupplierGroups
} from '../../../services/api'; // Adjust the path as needed

const SupplierList = () => {
  const [searchAll, setSearchAll] = useState('');
  const [supplierGroup, setSupplierGroup] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [supplierGroups, setSupplierGroups] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadData = async () => {
    try {
      const [suppliersRes, supplierGroupsRes] = await Promise.all([
        fetchSuppliers(),
        fetchSupplierGroups()
      ]);

      console.log(supplierGroupsRes.data);
      console.log(suppliersRes.data);

      setSuppliers(suppliersRes.data);
      setSupplierGroups(supplierGroupsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = () => {
    const filteredSuppliers = suppliers.filter(supplier => {
      const matchesSearchAll = searchAll
        ? supplier.name.includes(searchAll) ||
          supplier.phoneNumber.includes(searchAll) ||
          supplier.address.includes(searchAll)
        : true;
      const matchesSupplierGroup = supplierGroup
        ? supplier.supplierGroup.name === supplierGroup
        : true;
      const matchesStartDate = startDate
        ? new Date(supplier.createdAt) >= new Date(startDate)
        : true;
      const matchesEndDate = endDate
        ? new Date(supplier.createdAt) <= new Date(endDate)
        : true;
      return (
        matchesSearchAll &&
        matchesSupplierGroup &&
        matchesStartDate &&
        matchesEndDate
      );
    });
    setSuppliers(filteredSuppliers);
  };

  const handleReset = () => {
    setSearchAll('');
    setSupplierGroup('');
    setStartDate('');
    setEndDate('');
    fetchSuppliers().then(response => {
      setSuppliers(response.data);
    });
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Supplier List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          to='/supplier_add'
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search All</label>
          <div className="flex items-center">
            <input
              type="text"
              value={searchAll}
              placeholder="Search All..."
              onChange={(e) => setSearchAll(e.target.value)}
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
          <label className="block text-lg font-medium text-gray-700 mb-2">Search By Supplier Group</label>
          <select
            value={supplierGroup}
            onChange={(e) => setSupplierGroup(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select supplier group</option>
            {supplierGroups.map((group, idx) => (
              <option key={idx} value={group.id}>
                {group.groupName}
              </option>
            ))}
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

      <SupplierTable suppliers={suppliers.slice(0, rowsPerPage)} onSupplierUpdate={loadData} />

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {suppliers.length} of {suppliers.length} entries
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

export default SupplierList;

