// import { useState, useEffect } from 'react';

// import { FaPlus } from 'react-icons/fa';
// import Button from '../../../components/Button';
// import { fetchAllReceives } from '../../../services/api'; // import your API function

// const ReceiveList = () => {
//   const [searchClient, setSearchClient] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [receives, setReceives] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = () => {
//     setCurrentPage(1);
//     fetchData();
//   };

//   const handleReset = () => {
//     setSearchClient('');
//     setStartDate('');
//     setEndDate('');
//     fetchData();
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = {
//         client: searchClient,
//         startDate,
//         endDate,
//         limit: rowsPerPage,
//         page: currentPage,
//       };
//       const response = await fetchAllReceives(params);
//       setReceives(response.data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [searchClient, startDate, endDate, rowsPerPage, currentPage]);

//   const totalAmount = receives.reduce((total, receive) => total + receive.amount, 0);

//   return (
//     <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
//       {/* header section */}
//       <div className="flex justify-between items-center bg-[#5D5B10] p-4">
//         <h2 className="text-2xl font-bold text-white">Receive List</h2>
//         <Button
//           icon={<FaPlus />}
//           text="Add New"
//           bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
//           textColor="text-white border border-green-500"
//           to="/add_new_receive"
//         />
//       </div>

//       {/* Filter Portion */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//         <div className="p-4">
//           <label className="block text-lg font-medium text-gray-700 mb-2">Search Client</label>
//           <div className="flex items-center">
//             <input
//               type="text"
//               value={searchClient}
//               placeholder="Search Client..."
//               onChange={(e) => setSearchClient(e.target.value)}
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

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">SL</th>
//               <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Date</th>
//               <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">ID No</th>
//               <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Client</th>
//               <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
//               <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Amount</th>
//               <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Money Receipt</th>
//               <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {receives.slice(0, rowsPerPage).map((receive, index) => (
//               <tr key={receive._id}>
//                 <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
//                 <td className="py-2 px-4 border border-gray-200">{receive.date.slice(0,10)}</td>
//                 <td className="py-2 px-4 border border-gray-200">{receive._id.slice(0,7)}</td>
//                 <td className="py-2 px-4 border border-gray-200">{receive.client.name}</td>
//                 <td className="py-2 px-4 border border-gray-200">{receive.description}</td>
//                 <td className="py-2 px-4 border border-gray-200">{receive.amount}</td>
//                 <td className="py-2 px-4 border border-gray-200">{receive.moneyReceiptId}</td>
//                 <td className="py-2 px-4 border border-gray-200">
//                 </td>
//               </tr>
//             ))}
//             <tr>
//               <td colSpan="5" className="py-2 px-4 border border-gray-200 font-semibold text-right">Total</td>
//               <td className="py-2 px-4 border border-gray-200 font-semibold">{totalAmount}</td>
//               <td colSpan="2" className="py-2 px-4 border border-gray-200"></td>
//             </tr>
//           </tbody>
//         </table>
//       )}

//       <div className="flex justify-between items-center mt-6 p-4">
//         <span className="text-gray-700 text-sm">
//           Showing 1 to {Math.min(rowsPerPage, receives.length)} of {receives.length} entries
//         </span>
//         <div className="flex items-center space-x-2">
//         <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
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

// export default ReceiveList;



import { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa'; // Import FaTrash for delete icon
import Button from '../../../components/Button';
import { fetchAllReceives, deleteReceive } from '../../../services/api'; // Import deleteReceive

const ReceiveList = () => {
  const [searchClient, setSearchClient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [receives, setReceives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  };

  const handleReset = () => {
    setSearchClient('');
    setStartDate('');
    setEndDate('');
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        client: searchClient,
        startDate,
        endDate,
        limit: rowsPerPage,
        page: currentPage,
      };
      const response = await fetchAllReceives(params);
      setReceives(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchClient, startDate, endDate, rowsPerPage, currentPage]);

  const totalAmount = receives.reduce((total, receive) => total + receive.amount, 0);

  // Handle delete functionality
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this receive?")) {
      try {
        await deleteReceive(id);
        setReceives(receives.filter((receive) => receive._id !== id)); 
      } catch (err) {
        console.error("Failed to delete receive:", err);
        setError("Failed to delete receive. Please try again.");
      }
    }
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Receive List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          to="/add_new_receive"
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Client</label>
          <div className="flex items-center">
            <input
              type="text"
              value={searchClient}
              placeholder="Search Client..."
              onChange={(e) => setSearchClient(e.target.value)}
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

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">SL</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Date</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">ID No</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Client</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Amount</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Money Receipt</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {receives.slice(0, rowsPerPage).map((receive, index) => (
              <tr key={receive._id}>
                <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border border-gray-200">{receive.date.slice(0,10)}</td>
                <td className="py-2 px-4 border border-gray-200">{receive._id.slice(0,7)}</td>
                <td className="py-2 px-4 border border-gray-200">{receive.client.name}</td>
                <td className="py-2 px-4 border border-gray-200">{receive.description}</td>
                <td className="py-2 px-4 border border-gray-200">{receive.amount}</td>
                <td className="py-2 px-4 border border-gray-200">{receive.moneyReceiptId}</td>
                <td className="py-2 px-4 border border-gray-200">
                  <button
                    onClick={() => handleDelete(receive._id)} // Attach delete functionality
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="5" className="py-2 px-4 border border-gray-200 font-semibold text-right">Total</td>
              <td className="py-2 px-4 border border-gray-200 font-semibold">{totalAmount}</td>
              <td colSpan="2" className="py-2 px-4 border border-gray-200"></td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, receives.length)} of {receives.length} entries
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

export default ReceiveList;
