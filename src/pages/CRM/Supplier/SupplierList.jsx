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
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [supplierGroups, setSupplierGroups] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadData = async () => {
    try {
      const [suppliersRes, supplierGroupsRes] = await Promise.all([
        fetchSuppliers(),
        fetchSupplierGroups()
      ]);

      setSuppliers(suppliersRes.data);
      setFilteredSuppliers(suppliersRes.data); // Initialize filteredSuppliers with all suppliers
      setSupplierGroups(supplierGroupsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = () => {
    let filtered = suppliers;

    // Filter by Search All
    if (searchAll) {
      filtered = filtered.filter(supplier =>
        supplier.supplierName.toLowerCase().includes(searchAll.toLowerCase()) ||
        supplier.phone.includes(searchAll) ||
        supplier.address.toLowerCase().includes(searchAll.toLowerCase())
      );
    }

    // Filter by Supplier Group
    if (supplierGroup) {
      filtered = filtered.filter(supplier =>
        supplier.group && supplier.group.groupName === supplierGroup
      );
    }

    // Filter by Start Date
    if (startDate) {
      filtered = filtered.filter(supplier =>
        new Date(supplier.createdAt) >= new Date(startDate)
      );
    }

    // Filter by End Date
    if (endDate) {
      filtered = filtered.filter(supplier =>
        new Date(supplier.createdAt) <= new Date(endDate)
      );
    }

    setFilteredSuppliers(filtered);
  };

  const handleReset = () => {
    setSearchAll('');
    setSupplierGroup('');
    setStartDate('');
    setEndDate('');
    setFilteredSuppliers(suppliers);
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
              <option key={idx} value={group.groupName}>
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

      <SupplierTable suppliers={filteredSuppliers.slice(0, rowsPerPage)} onSupplierUpdate={loadData} />

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {filteredSuppliers.length} of {filteredSuppliers.length} entries
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
