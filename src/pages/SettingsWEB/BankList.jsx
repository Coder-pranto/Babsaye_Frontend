

import { useState, useEffect } from 'react';
import { FaDollarSign, FaExchangeAlt, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import Button from '../../components/Button';
import TransactionModal from './TransactionModal';
import { fetchBankAccounts, deleteBankAccount, depositFunds, withdrawFunds, transferFunds } from '../../services/api';
import { toast } from 'react-toastify';

const BankList = () => {
  const [accounts, setAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [searchAll, setSearchAll] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadAccounts = async () => {
      const response = await fetchBankAccounts();
      setAccounts(response.data);
    };
    loadAccounts();
  }, []);


  const handleSearch = () => {
    return accounts.filter((account) =>
      account.bankName.toLowerCase().includes(searchAll.toLowerCase())
    );
  };

  const handleReset = () => setSearchAll('');

  const handleTransaction = async ({ amount, toAccount }) => {
    try {
      if (transactionType === 'deposit') {
        await depositFunds(selectedAccountId, amount);
        toast.success('Deposit successful!');
      } else if (transactionType === 'withdrawal') {
        await withdrawFunds(selectedAccountId, amount);
        toast.success('Withdrawal successful!');
      } else if (transactionType === 'transfer') {
        await transferFunds(selectedAccountId, toAccount, amount);
        toast.success('Transfer successful!');
      }
      const updatedAccounts = await fetchBankAccounts();
      setAccounts(updatedAccounts.data);
    } catch (error) {
      toast.error(`Failed to ${transactionType} funds: ${error.message}`);
    }
  };
  

  // Pagination and filtered data
  const filteredAccounts = handleSearch();
  const totalPages = Math.ceil(filteredAccounts.length / rowsPerPage);
  const displayedAccounts = filteredAccounts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  // Filter accounts for transfer modal
  const availableAccounts = accounts.filter(account => account._id !== selectedAccountId);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Bank Accounts</h2>
        <Button
          icon={<FaPlus />}
          text="Add Account"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          to='/bank'
        />
      </div>

      {/* Search bar */}
      <div className="flex justify-start my-4">
        <input
          type="text"
          value={searchAll}
          placeholder="Search Bank Name..."
          onChange={(e) => setSearchAll(e.target.value)}
          className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button text="Clear" onClick={handleReset} />
      </div>

      {/* Rows per page selector */}
      <div className="flex justify-start mb-4">
        <label className="mx-2 text-md font-medium text-gray-700">Show</label>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Bank accounts table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account Number</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Bank Name</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Balance</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedAccounts.map((account) => (
            <tr key={account._id}>
              <td className="py-2 px-4 border border-gray-200">{account.accountNumber}</td>
              <td className="py-2 px-4 border border-gray-200">{account.bankName}</td>
              <td className="py-2 px-4 border border-gray-200">&#2547; {account.balance.toFixed(2)}</td>
              <td className="py-2 px-4 border border-gray-200">
                <div className="flex space-x-2">
                  <button
                    onClick={() => { setTransactionType('deposit'); setSelectedAccountId(account._id); setIsModalOpen(true); }}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaDollarSign /> Deposit
                  </button>
                  <button
                    onClick={() => { setTransactionType('withdrawal'); setSelectedAccountId(account._id); setIsModalOpen(true); }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaDollarSign /> Withdraw
                  </button>
                  <button
                    onClick={() => { setTransactionType('transfer'); setSelectedAccountId(account._id); setIsModalOpen(true); }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaExchangeAlt /> Transfer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-gray-700 text-sm">Page {currentPage} of {totalPages}</span>
        <div className="flex space-x-2">
          <Button text="Previous" onClick={goToPreviousPage} disabled={currentPage === 1} />
          <Button text="Next" onClick={goToNextPage} disabled={currentPage === totalPages} />
        </div>
      </div>

      {/* Transaction Modal */}
      {isModalOpen && (
        <TransactionModal
          type={transactionType}
          onSubmit={handleTransaction}
          onClose={() => setIsModalOpen(false)}
          accounts={availableAccounts}
        />
      )}
    </div>
  );
};

export default BankList;
