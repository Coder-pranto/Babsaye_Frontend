import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../../components/Button';
import ClientTable from './ClientTable';
import {
  fetchClients,
  fetchClientGroups
} from '../../../services/api'; // Adjust the path as needed

const ClientList = () => {
  const [searchAll, setSearchAll] = useState('');
  const [clientGroup, setClientGroup] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clients, setClients] = useState([]);
  const [clientGroups, setClientGroups] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadData = async () => {
    try {
      const [clientsRes, clientGroupsRes] = await Promise.all([
        fetchClients(),
        fetchClientGroups()
      ]);

      setClients(clientsRes.data);
      setClientGroups(clientGroupsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = () => {
    let filteredClients = clients;

    // Filter by Search All
    if (searchAll) {
      filteredClients = filteredClients.filter(client => 
        client.name.toLowerCase().includes(searchAll.toLowerCase()) ||
        client.phoneNumber.includes(searchAll) ||
        client.address.toLowerCase().includes(searchAll.toLowerCase())
      );
    }

    // Filter by Client Group
    if (clientGroup) {
      filteredClients = filteredClients.filter(client => 
        client.clientGroup && client.clientGroup._id === clientGroup
      );
    }

    // Filter by Start Date
    if (startDate) {
      filteredClients = filteredClients.filter(client => 
        new Date(client.createdAt) >= new Date(startDate)
      );
    }

    // Filter by End Date
    if (endDate) {
      filteredClients = filteredClients.filter(client => 
        new Date(client.createdAt) <= new Date(endDate)
      );
    }

    // Set filtered clients to state
    setClients(filteredClients);
  };

  const handleReset = () => {
    setSearchAll('');
    setClientGroup('');
    setStartDate('');
    setEndDate('');
    loadData();
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Customer List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          to='/client_add'
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
          <label className="block text-lg font-medium text-gray-700 mb-2">Search By Client Group</label>
          <select
            value={clientGroup}
            onChange={(e) => setClientGroup(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select client group</option>
            {clientGroups.map((group, idx) => (
              <option key={idx} value={group._id}>
                {group.name}
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

      <ClientTable clients={clients.slice(0, rowsPerPage)} onClientUpdate={loadData} />

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {clients.length} of {clients.length} entries
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

export default ClientList;
