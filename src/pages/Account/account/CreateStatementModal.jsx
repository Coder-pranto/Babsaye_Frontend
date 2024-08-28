// import { useEffect, useState } from 'react';
// import { fetchAllAccount, fetchClients } from '../../../services/api'; 

// const CreateStatementModal = ({ isOpen, onClose, onSubmit, statement, setStatement }) => {
//   const [clients, setClients] = useState([]);
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     // Fetch clients and accounts data when the modal is open
//     if (isOpen) {
//       fetchClients().then((res) => setClients(res.data));
//       fetchAllAccount().then((res) => setAccounts(res.data));
//     }
//   }, [isOpen]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStatement({ ...statement, [name]: value });
//   };

//   return (
//     <div
//       className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//     >
//       <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
//         <h2 className="text-2xl font-bold mb-4">Create New Statement</h2>
//         <form onSubmit={onSubmit}>
//           <label className="block mb-2">
//             <span className="text-gray-700">Client</span>
//             <select
//               name="client"
//               value={statement?.client || ''}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded"
//               required
//             >
//               <option value="">Select client</option>
//               {clients.map((client) => (
//                 <option key={client._id} value={client._id}>
//                   {client.name}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label className="block mb-2">
//             <span className="text-gray-700">Type</span>
//             <select
//               name="type"
//               value={statement?.type || ''}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded"
//               required
//             >
//               <option value="">Select type</option>
//               <option value="Credit">Credit</option>
//               <option value="Debit">Debit</option>
//             </select>
//           </label>
//           <label className="block mb-2">
//             <span className="text-gray-700">Account</span>
//             <select
//               name="account"
//               value={statement?.account || ''}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded"
//               required
//             >
//               <option value="">Select account</option>
//               {accounts.map((account) => (
//                 <option key={account._id} value={account._id}>
//                   {account.title}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label className="block mb-2">
//             <span className="text-gray-700">Credit Amount</span>
//             <input
//               type="number"
//               name="credit"
//               value={statement?.credit || ''}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded"
//             />
//           </label>
//           <label className="block mb-2">
//             <span className="text-gray-700">Debit Amount</span>
//             <input
//               type="number"
//               name="debit"
//               value={statement?.debit || ''}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded"
//             />
//           </label>
//           <label className="block mb-2">
//             <span className="text-gray-700">Description</span>
//             <textarea
//               name="description"
//               value={statement?.description || ''}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded"
//             />
//           </label>
//           <div className="flex justify-end space-x-2 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 text-white py-2 px-4 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded"
//             >
//               Create
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateStatementModal;
import { useEffect, useState } from 'react';
import { fetchAllAccount, fetchClients } from '../../../services/api'; 

const CreateStatementModal = ({ isOpen, onClose, onSubmit, statement, setStatement }) => {
  const [clients, setClients] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchClients().then((res) => setClients(res.data));
      fetchAllAccount().then((res) => setAccounts(res.data));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatement({ ...statement, [name]: value });
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Create New Statement</h2>
        <form onSubmit={onSubmit}>
          <label className="block mb-2">
            <span className="text-gray-700">Client</span>
            <select
              name="client"
              value={statement?.client || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Type</span>
            <select
              name="type"
              value={statement?.type || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select type</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Account</span>
            <select
              name="account"
              value={statement?.account || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select account</option>
              {accounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Credit Amount</span>
            <input
              type="number"
              name="credit"
              value={statement?.credit || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Debit Amount</span>
            <input
              type="number"
              name="debit"
              value={statement?.debit || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Description</span>
            <textarea
              name="description"
              value={statement?.description || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStatementModal;
