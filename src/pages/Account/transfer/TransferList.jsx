import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../../components/Button';
import {
  fetchAllTransfers,
  deleteTransfer,
} from '../../../services/api'; // Assuming you store API calls in a separate 'api.js'

const TransferList = () => {
  const [searchAccount, setSearchAccount] = useState('');
  const [searchType, setSearchType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTransfers();
  }, [rowsPerPage, currentPage]);

  const fetchTransfers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchAllTransfers();
      setTransfers(response.data);
    } catch (err) {
      setError('Error fetching transfers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transfer?')) {
      try {
        await deleteTransfer(id);
        setTransfers((prev) => prev.filter((transfer) => transfer._id !== id));
      } catch (err) {
        setError('Error deleting transfer');
      }
    }
  };

  const handleReset = () => {
    setSearchAccount('');
    setSearchType('');
    setStartDate('');
    setEndDate('');
  };

  // Filter the transfers based on search criteria
  const filteredTransfers = transfers.filter((transfer) => {
    const matchesAccount = searchAccount
      ? transfer.fromAccount.title.includes(searchAccount) || (transfer.toAccount && transfer.toAccount.title.includes(searchAccount))
      : true;
    const matchesType = searchType ? transfer.transactionType === searchType : true;
    const matchesStartDate = startDate ? new Date(transfer.date) >= new Date(startDate) : true;
    const matchesEndDate = endDate ? new Date(transfer.date) <= new Date(endDate) : true;
    return matchesAccount && matchesType && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Transfer List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          onClick={() => console.log('Add new transfer')}
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-4 gap-2 mb-4">
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
            <option value="transfer">Transfer</option>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
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

      {/* Display loading, error messages */}
      {loading && <div>Loading transfers...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Transfer Table */}
      {!loading && (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">SL</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Date</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Sender/Receiver</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Type</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Credit</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Debit</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Balance</th>
              <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransfers.slice(0, rowsPerPage).map((transfer, index) => (
              <tr key={transfer._id}>
                <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border border-gray-200">{new Date(transfer.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border border-gray-200">
                  {transfer.transactionType === 'transfer'
                    ? `${transfer.fromAccount?.title} / ${transfer.toAccount?.title}`
                    : `${transfer.fromAccount?.title}`}
                </td>
                <td className="py-2 px-4 border border-gray-200">{transfer.transactionType}</td>
                <td className="py-2 px-4 border border-gray-200">
                  {transfer.transactionType === 'transfer'
                    ? `${transfer.fromAccount?.title} / ${transfer.toAccount?.title}`
                    : transfer.fromAccount?.title}
                </td>
                <td className="py-2 px-4 border border-gray-200">{transfer.description}</td>
                <td className="py-2 px-4 border border-gray-200">
                  {transfer.transactionType === 'deposit' || transfer.transactionType === 'transfer'
                    ? transfer.amount
                    : '-'}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {transfer.transactionType === 'withdraw' || transfer.transactionType === 'transfer'
                    ? transfer.amount
                    : '-'}
                </td>
                <td className="py-2 px-4 border border-gray-200">{transfer.amount}</td>
                <td className="py-2 px-4 border border-gray-200">
                  <button
                    className="px-4 py-1 text-sm text-white bg-red-600 rounded"
                    onClick={() => handleDelete(transfer._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransferList;
