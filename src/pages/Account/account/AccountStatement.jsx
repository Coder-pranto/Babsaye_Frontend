// import { useState, useEffect } from 'react';
// import { FaPlus } from 'react-icons/fa';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Button from '../../../components/Button';
// import CreateStatementModal from './CreateStatementModal';
// import { fetchAllAccount, fetchClients, addTransaction } from '../../../services/api';

// const AccountStatement = () => {
//   const [searchClient, setSearchClient] = useState('');
//   const [searchAccount, setSearchAccount] = useState('');
//   const [searchType, setSearchType] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [statements, setStatements] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [clients, setClients] = useState([]);
//   const [accounts, setAccounts] = useState([]);
//   const [newStatement, setNewStatement] = useState({
//     client: '',
//     account: '',
//     type: '',
//     credit: 0,
//     debit: 0,
//     description: '',
//   });

//   useEffect(() => {
//     // Fetch clients and accounts when the component mounts
//     const fetchData = async () => {
//       const [clientRes, accountRes] = await Promise.all([fetchClients(), fetchAllAccount()]);
//       setClients(clientRes.data);
//       setAccounts(accountRes.data);
//     };
//     fetchData();
//   }, []);

//   const handleSearch = () => {
    
//   };

//   const handleReset = () => {
//     setSearchClient('');
//     setSearchAccount('');
//     setSearchType('');
//     setStartDate('');
//     setEndDate('');
//   };

//   const handleModalSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await addTransaction(newStatement);
//       setStatements([...statements, response.data]);
//       setIsModalOpen(false);
//       setNewStatement({
//         client: '',
//         account: '',
//         type: '',
//         credit: 0,
//         debit: 0,
//         description: '',
//       });
//       toast.success("Transaction added successfully!");
//     } catch (error) {
//       toast.error("Failed to add transaction. Please try again.");
//       console.error("Failed to add transaction:", error.message);
//     }
//   };

//   // Calculate totals
//   const totalCredit = statements.reduce((acc, curr) => acc + curr.credit, 0);
//   const totalDebit = statements.reduce((acc, curr) => acc + curr.debit, 0);
//   const totalBalance = statements.reduce((acc, curr) => acc + curr.balance, 0);

//   return (
//     <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
//       {/* header section */}
//       <div className="flex justify-between items-center bg-[#5D5B10] p-4">
//         <h2 className="text-2xl font-bold text-white">Account Statement</h2>
//         <Button
//           icon={<FaPlus />}
//           text="Add New"
//           bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
//           textColor="text-white border border-green-500"
//           onClick={() => setIsModalOpen(true)}
//         />
//       </div>

//       {/* Filter Portion */}
//       <div className="grid grid-cols-5 gap-2 mb-4">
//         <div className="p-4">
//           <label className="block text-lg font-medium text-gray-700 mb-2">Client Search</label>
//           <input
//             type="text"
//             value={searchClient}
//             placeholder="Search Client..."
//             onChange={(e) => setSearchClient(e.target.value)}
//             className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div className="p-4">
//           <label className="block text-lg font-medium text-gray-700 mb-2">Search Account</label>
//           <input
//             type="text"
//             value={searchAccount}
//             placeholder="Search Account..."
//             onChange={(e) => setSearchAccount(e.target.value)}
//             className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div className="p-4">
//           <label className="block text-lg font-medium text-gray-700 mb-2">Search Type</label>
//           <select
//             value={searchType}
//             onChange={(e) => setSearchType(e.target.value)}
//             className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Select type</option>
//             <option value="Deposit">Deposit</option>
//             <option value="Cost">Cost</option>
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

//       {/* Table Section */}
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">SL</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Date</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Client/Supplier</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Type</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Credit</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Debit</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Balance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {statements.slice(0, rowsPerPage).map((statement, index) => (
//             <tr key={statement.id}>
//               <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
//               <td className="py-2 px-4 border border-gray-200">{statement.date}</td>
//               <td className="py-2 px-4 border border-gray-200">{statement.client}</td>
//               <td className="py-2 px-4 border border-gray-200">{statement.type}</td>
//               <td className="py-2 px-4 border border-gray-200">{statement.account}</td>
//               <td className="py-2 px-4 border border-gray-200">{statement.description}</td>
//               <td className="py-2 px-4 border border-gray-200">{statement.credit}</td>
//               <td className="py-2 px-4 border border-gray-200">{statement.debit}</td>
//               <td className="py-2 px-4 border border-gray-200">{statement.balance}</td>
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           <tr className="bg-gray-100">
//             <td colSpan="6" className="py-2 px-4 border border-gray-200 text-right font-semibold">Total</td>
//             <td className="py-2 px-4 border border-gray-200 font-semibold">{totalCredit}</td>
//             <td className="py-2 px-4 border border-gray-200 font-semibold">{totalDebit}</td>
//             <td className="py-2 px-4 border border-gray-200 font-semibold">{totalBalance}</td>
//           </tr>
//         </tfoot>
//       </table>

//       <CreateStatementModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleModalSubmit}
//         clients={clients}
//         accounts={accounts}
//         statement={newStatement}
//         setStatement={setNewStatement}
//       />
//       <ToastContainer />
//     </div>
//   );
// };

// export default AccountStatement;





import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../components/Button';
import CreateStatementModal from './CreateStatementModal';
import { fetchAllAccount, fetchClients, fetchAllTransactions, addTransaction } from '../../../services/api';

const AccountStatement = () => {
  const [searchClient, setSearchClient] = useState('');
  const [searchAccount, setSearchAccount] = useState('');
  const [searchType, setSearchType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statements, setStatements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [newStatement, setNewStatement] = useState({
    client: '',
    account: '',
    type: '',
    credit: 0,
    debit: 0,
    description: '',
  });

  useEffect(() => {
    // Fetch clients, accounts, and initial transactions when the component mounts
    const fetchData = async () => {
      try {
        const [clientRes, accountRes, transactionRes] = await Promise.all([
          fetchClients(),
          fetchAllAccount(),
          fetchAllTransactions()
        ]);
        setClients(clientRes.data);
        setAccounts(accountRes.data);
        setStatements(transactionRes.data);
      } catch (error) {
        toast.error("Failed to load data. Please try again.");
        console.error("Failed to load data:", error.message);
      }
    };
    fetchData();
    console.log(statements);
  }, []);

  const handleSearch = () => {
    const filteredStatements = statements.filter((statement) => {
      const matchClient = searchClient ? statement.client.toLowerCase().includes(searchClient.toLowerCase()) : true;
      const matchAccount = searchAccount ? statement.account.toLowerCase().includes(searchAccount.toLowerCase()) : true;
      const matchType = searchType ? statement.type === searchType : true;
      const matchStartDate = startDate ? new Date(statement.date) >= new Date(startDate) : true;
      const matchEndDate = endDate ? new Date(statement.date) <= new Date(endDate) : true;

      return matchClient && matchAccount && matchType && matchStartDate && matchEndDate;
    });

    setStatements(filteredStatements);
  };

  const handleReset = () => {
    setSearchClient('');
    setSearchAccount('');
    setSearchType('');
    setStartDate('');
    setEndDate('');
    // Re-fetch the original data
    fetchAllTransactions().then(response => {
      setStatements(response.data);
    });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addTransaction(newStatement);
      setStatements([...statements, response.data]);
      setIsModalOpen(false);
      setNewStatement({
        client: '',
        account: '',
        type: '',
        credit: 0,
        debit: 0,
        description: '',
      });
      toast.success("Transaction added successfully!");
    } catch (error) {
      toast.error("Failed to add transaction. Please try again.");
      console.error("Failed to add transaction:", error.message);
    }
  };

  // Calculate totals
  const totalCredit = statements.reduce((acc, curr) => acc + curr.credit, 0);
  const totalDebit = statements.reduce((acc, curr) => acc + curr.debit, 0);
  const totalBalance = statements.reduce((acc, curr) => acc + curr.balance, 0);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Account Statement</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Client Search</label>
          <input
            type="text"
            value={searchClient}
            placeholder="Search Client..."
            onChange={(e) => setSearchClient(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Account</label>
          <input
            type="text"
            value={searchAccount}
            placeholder="Search Account..."
            onChange={(e) => setSearchAccount(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Type</label>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select type</option>
            <option value="Deposit">Deposit</option>
            <option value="Cost">Cost</option>
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

      {/* Table Section */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">SL</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Date</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Client/Supplier</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Type</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Credit</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Debit</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Balance</th>
          </tr>
        </thead>
        <tbody>
  {statements.slice(0, rowsPerPage).map((statement, index) => (
    <tr key={index}>
      <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
      <td className="py-2 px-4 border border-gray-200">{statement.date}</td>
      <td className="py-2 px-4 border border-gray-200">{statement.client?.name || 'N/A'}</td>
      <td className="py-2 px-4 border border-gray-200">{statement.type}</td>
      <td className="py-2 px-4 border border-gray-200">{statement.account?.title || 'N/A'}</td> {/* Updated line */}
      <td className="py-2 px-4 border border-gray-200">{statement.description}</td>
      <td className="py-2 px-4 border border-gray-200">{statement.credit}</td>
      <td className="py-2 px-4 border border-gray-200">{statement.debit}</td>
      <td className="py-2 px-4 border border-gray-200">{statement.balance}</td>
    </tr>
  ))}
</tbody>


        <tfoot>
          <tr className="bg-gray-100">
            <td colSpan="6" className="py-2 px-4 border border-gray-200 text-right font-semibold">Total</td>
            <td className="py-2 px-4 border border-gray-200 font-semibold">{totalCredit}</td>
            <td className="py-2 px-4 border border-gray-200 font-semibold">{totalDebit}</td>
            <td className="py-2 px-4 border border-gray-200 font-semibold">{totalBalance}</td>
          </tr>
        </tfoot>
      </table>

      <CreateStatementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        clients={clients}
        accounts={accounts}
        statement={newStatement}
        setStatement={setNewStatement}
      />
      <ToastContainer />
    </div>
  );
};

export default AccountStatement;
