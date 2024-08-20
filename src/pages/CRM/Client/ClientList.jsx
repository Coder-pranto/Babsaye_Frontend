// import { useState } from 'react';
// import { FaPlus } from 'react-icons/fa';
// import Button from '../../../components/Button';
// import ClientTable from './ClientTable';

// const ClientList = () => {
//   const [searchAll, setSearchAll] = useState('');
//   const [clientGroup, setClientGroup] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [clients, setClients] = useState([
//     {
//       id: 1,
//       name: 'shanto',
//       phone: '01673836266',
//       address: 'rampura, dhaka',
//       createdAt: '29 Jul 2024',
//       previousDue: 0.00,
//       bill: 0,
//       totalBill: 0,
//       receive: 0,
//       salesReturn: 0,
//       moneyReturn: 0,
//       due: 0
//     }
//     // Add more client objects as needed
//   ]);

//   const handleSearch = () => {
//     // Implement search functionality here
//   };

//   const handleReset = () => {
//     setSearchAll('');
//     setClientGroup('');
//     setStartDate('');
//     setEndDate('');
//   };

//   return (
//     <div className=" mx-auto p-4 mt-10 mb-4 overflow-y-auto">

//      {/* header section  */}
//       <div className="flex justify-between items-center bg-[#5D5B10] p-4">
//         <h2 className="text-2xl font-bold text-white">Customer List</h2>
//         <Button 
//           icon={<FaPlus />} 
//           text="Add New" 
//           bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]" 
//           textColor="text-white border border-green-500" 
//         />
//       </div>


//      {/* Filter Portion  */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//       <div className="p-4">
//         <label className="block text-lg font-medium text-gray-700 mb-2">Search All</label>
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={searchAll}
//             placeholder="Search All..."
//             onChange={(e) => setSearchAll(e.target.value)}
//             className="input flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
//           />
//           <button
//             onClick={handleSearch}
//             className="btn bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
//           >
//             Search
//           </button>
//         </div>
//       </div>
//       <div className="p-4">
//         <label className="block text-lg font-medium text-gray-700 mb-2">Search By Client Group</label>
//         <select
//           value={clientGroup}
//           onChange={(e) => setClientGroup(e.target.value)}
//           className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="">Select client group</option>
//           <option value="group1">Client Group 1</option>
//           <option value="group2">Client Group 2</option>
//           <option value="group3">Client Group 3</option>
//           <option value="group4">Client Group 4</option>
//         </select>
//       </div>
//       <div className="p-4">
//         <label className="block text-lg font-medium text-gray-700 mb-2">Search By Date</label>
//         <div className="flex space-x-2">
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>
//       <div className="flex flex-col justify-center items-center p-4 mt-8">
//         <Button
//           text="Clear Filter"
//           bgColor="bg-slate-800 hover:bg-slate-600"
//           textColor="text-white"
//           onClick={handleReset}
//         />
//       </div>
//     </div>

//     {/* //here add a drop down like : how many row i want to display (10, 25, 50, 100) . user can select the number from the  dropdown. and then it will take effect on main table  */}
     
//      <ClientTable clients={clients}/>

//     <div className="flex justify-between items-center mt-6 p-4">
//         <span className="text-gray-700 text-sm">
//             Showing 1 to {clients.length} of {clients.length} entries
//         </span>
//         <div className="flex items-center space-x-2">
//             <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
//                 Previous
//             </button>
//             <span className="text-white bg-blue-500 border-1 p-2 font-semibold rounded-sm">1</span>
//             <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
//                 Next
//             </button>
//         </div>
//     </div>

//     </div>
//   );
// };

// export default ClientList;


//* first one u shouldn't delete

// import { useState } from 'react';
// import { FaPlus } from 'react-icons/fa';
// import Button from '../../../components/Button';
// import ClientTable from './ClientTable';

// const ClientList = () => {
//   const [searchAll, setSearchAll] = useState('');
//   const [clientGroup, setClientGroup] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [clients, setClients] = useState([
//     {
//       id: 1,
//       name: 'shanto',
//       phone: '01673836266',
//       address: 'rampura, dhaka',
//       createdAt: '29 Jul 2024',
//       previousDue: 0.00,
//       bill: 0,
//       totalBill: 0,
//       receive: 0,
//       salesReturn: 0,
//       moneyReturn: 0,
//       due: 0
//     }
//     // Add more client objects as needed
//   ]);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleSearch = () => {
//     // Implement search functionality here
//   };

//   const handleReset = () => {
//     setSearchAll('');
//     setClientGroup('');
//     setStartDate('');
//     setEndDate('');
//   };

//   return (
//     <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">

//       {/* header section */}
//       <div className="flex justify-between items-center bg-[#5D5B10] p-4">
//         <h2 className="text-2xl font-bold text-white">Customer List</h2>
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
//           <div className="flex items-center">
//             <input
//               type="text"
//               value={searchAll}
//               placeholder="Search All..."
//               onChange={(e) => setSearchAll(e.target.value)}
//               className="input flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
//             />
//             <button
//               onClick={handleSearch}
//               className="btn bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//         <div className="p-4">
//           <label className="block text-lg font-medium text-gray-700 mb-2">Search By Client Group</label>
//           <select
//             value={clientGroup}
//             onChange={(e) => setClientGroup(e.target.value)}
//             className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Select client group</option>
//             <option value="group1">Client Group 1</option>
//             <option value="group2">Client Group 2</option>
//             <option value="group3">Client Group 3</option>
//             <option value="group4">Client Group 4</option>
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

//       <ClientTable clients={clients.slice(0, rowsPerPage)} />

//       <div className="flex justify-between items-center mt-6 p-4">
//         <span className="text-gray-700 text-sm">
//           Showing 1 to {clients.length} of {clients.length} entries
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

// export default ClientList;



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
    // Implement search functionality here
    const filteredClients = clients.filter(client => {
      const matchesSearchAll = searchAll
        ? client.name.includes(searchAll) ||
          client.phoneNumber.includes(searchAll) ||
          client.address.includes(searchAll)
        : true;
      const matchesClientGroup = clientGroup? client.clientGroup.name === clientGroup: true;
      console.log("filter", client.clientGroup.name, clientGroup )
        
        
      const matchesStartDate = startDate
        ? new Date(client.createdAt) >= new Date(startDate)
        : true;
      const matchesEndDate = endDate
        ? new Date(client.createdAt) <= new Date(endDate)
        : true;
      return (
        matchesSearchAll &&
        matchesClientGroup &&
        matchesStartDate &&
        matchesEndDate
      );
    });
    setClients(filteredClients);
  };

  const handleReset = () => {
    setSearchAll('');
    setClientGroup('');
    setStartDate('');
    setEndDate('');
    // Reload the clients from the API
    fetchClients().then(response => {
      setClients(response.data);
    });
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
              <option key={idx} value={group.id}>
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








